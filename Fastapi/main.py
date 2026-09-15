from fastapi import FastAPI,File, UploadFile
from pypdf import PdfReader
import io
from fastapi.middleware.cors import CORSMiddleware
from Datacleaning import datacleaning,chunk_data,create_faiss_index
import numpy as np
import faiss
import pickle
import numpy as np

from variable import client

# embedding model
from sentence_transformers import SentenceTransformer
model =SentenceTransformer('all-Minilm-l6-v2')


app =FastAPI()

#cors setupfor frontend and backend communication
app.add_middleware(CORSMiddleware, 
                   allow_origins=["*"],
                   allow_credentials=False,
                   allow_methods=["*"],
                   allow_headers=["*"])



@app.post("/home")
async def home(file: UploadFile=File(...)):
    content=await file.read()
    Filename=file.filename.lower()
    try:
        if Filename.endswith(".pdf")    :
            pdf=PdfReader(io.BytesIO(content))
            text=""
            for page in pdf.pages:
                text+=page.extract_text() or ""
            text=datacleaning(text)
            chunks=chunk_data(text)
            print("chunks created")
           
            # Convert chunks to embeddings
            Embeddings=model.encode(chunks)

            # using a function to create a faiss index and add embeddings to the index
            index=create_faiss_index(Embeddings,chunks)            

        else:
            text=content.decode("utf-8")
            text=datacleaning(text)
            chunks=chunk_data(text)
            Embeddings=model.encode(chunks)
            print("embedding model loaded",len(Embeddings))
            print("Embedding dimension:", Embeddings[0].shape)
    except:
        text="Error reading file"

    return {"message":"upload your file", "filename":file.filename,"content":text,"chunks":chunks}


index_path="storage/faiss.index"
chunks_path="storage/chunks.pk1"
@app.get("/search")
async def search(question:str):
    print("searching for question:",question)

    #get stored faiss index 
    index = faiss.read_index(index_path)

    #load original chunkes
    with open(chunks_path,"rb")as file:
        chunks=pickle.load(file)

    #convert Question into embedding
    question_embedding=model.encode([question])
    question_embedding=np.array(question_embedding).astype("float32")

    #top 3 similar chunks
    distence ,indice=index.search(question_embedding,3)
    
    #get the chunks from the indices
    result=[chunks[i] for i in indice[0]]

    #converting chunks into context
    context="\n\n".join(result)

    #promt for sending to LLM
    promt=f"""
    You answer questions about uploaded documents.

    RULES:
    1. Answer directly and concisely.
    2. Use ONLY the provided context.
    3. Never say "Based on the provided context".
    4. Never say "According to the context".
    5. Never mention that you are using context.
    6. Do not explain your reasoning.
    7. Use bullet points for lists.
    8. If the answer cannot be found in the context, respond exactly:
    "I don't have enough information in the uploaded documents."

    Context:
    {context}

    Question:
    {question}

    """
    respone=await client.aio.models.generate_content(
         model="gemini-3.5-flash-lite",
         contents=promt
    )

    answer=respone.text
    print(answer)

    return {"question":question,"answer":answer ,"chunks":result,"distence":distence[0].tolist()}


