def datacleaning(text:str):
    text=text.replace("\n"," ")
    text=" ".join (text.split())
    return text


def chunk_data(text,size=1000):
    words=text.split() 
    chunks=[]
    for chunk in range(0,len(words),size):
        chunk=" ".join(words[chunk:chunk+size])
        chunks.append(chunk)
   
    return chunks

import numpy as np
import faiss
import os
import pickle
# create a function to add faiss index creation and adding embeddings to the index
def create_faiss_index(embeddings,chunks):
    # Convert embeddings to numpy array
    embeddings = np.array(embeddings).astype(np.float32)

    # Create a faiss index
    

    #create a folder to store chunks and faiss index and vetor if not exists
    os.makedirs("storage", exist_ok=True)

    index_path="storage/faiss.index"
    chunks_path="storage/chunks.pk1"
    
    #check if the index and chunks already exist
    if os.path.exists(index_path) and os.path.exists(chunks_path):

        #load the existingxfaiss index 
        index=faiss.read_index(index_path)

        #load the existing chunks
        with open(chunks_path,"rb") as file:
            old_chunks=pickle.load(file)

        #add the new embeddings to the existing index
        index.add(embeddings)
        faiss.write_index(index, index_path)

        #add the new chunks to the existing chunks
        with open(chunks_path,"wb") as file:
            pickle.dump(old_chunks + chunks, file)
    else:
        dimension = embeddings.shape[1]
        index = faiss.IndexFlatL2(dimension)
        index.add(embeddings)
        print(index.ntotal, "vectors in the index")
            
        #save the index in storage folder
        faiss.write_index(index,index_path)
        print("faiss index saved in storage folder")

        #save the chunks in storage folder
        with open(chunks_path,"wb")as file:
            pickle.dump(chunks,file)
            print("chunks saved in storage folder")


    return index