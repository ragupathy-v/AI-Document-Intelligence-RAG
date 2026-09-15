# AI Document Intelligence & Knowledge Assistant

An AI-powered document question-answering application that allows users to upload PDF or TXT documents and ask questions about their content.

The application uses **Retrieval-Augmented Generation (RAG)** to retrieve relevant document chunks using semantic search and generate answers using Google Gemini.

## 🚀 Features

* 📄 Upload PDF and TXT documents
* 🔍 Extract text from uploaded documents
* 🧹 Clean and preprocess extracted text
* ✂️ Split documents into smaller chunks
* 🧠 Generate text embeddings using Sentence Transformers
* 📦 Store embeddings in a FAISS vector index
* 🔎 Perform semantic similarity search
* 🤖 Generate answers using Google Gemini
* 📚 Provide retrieved document chunks as context to the LLM
* ⚡ FastAPI backend with asynchronous Gemini API calls
* ⚛️ React frontend for document upload and question answering
* 🔐 Gemini API key managed using environment variables

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │                     │
                    │ Upload + Search UI  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   FastAPI Backend   │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │ Document        │         │ User Question   │
        │ Processing      │         │                 │
        └────────┬────────┘         └────────┬────────┘
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │ Text Extraction │         │ Query Embedding │
        │ PDF / TXT       │         │ MiniLM          │
        └────────┬────────┘         └────────┬────────┘
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │ Text Cleaning   │         │ FAISS Search    │
        └────────┬────────┘         └────────┬────────┘
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │ Text Chunking   │────────▶│ Top-K Chunks    │
        └────────┬────────┘         └────────┬────────┘
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │ Embeddings      │         │ Gemini LLM      │
        │ all-MiniLM-L6   │────────▶│ Answer          │
        └────────┬────────┘         └─────────────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ FAISS Index     │
        └─────────────────┘
```

## 🔄 RAG Workflow

The application follows these steps:

### 1. Document Upload

The user uploads a PDF or TXT document through the React frontend.

### 2. Text Extraction

The FastAPI backend extracts text from the uploaded document.

For PDF files, `pypdf` is used to extract text from each page.

### 3. Text Cleaning

The extracted text is cleaned by:

* Removing unnecessary line breaks
* Removing extra whitespace
* Normalizing the text

### 4. Text Chunking

The cleaned document is divided into smaller chunks.

The current implementation uses approximately **1000 words per chunk**.

```text
Document
   ↓
Cleaned Text
   ↓
1000-word chunks
   ↓
Chunk 1
Chunk 2
Chunk 3
...
```

### 5. Embedding Generation

Each document chunk is converted into a numerical vector using:

```text
all-MiniLM-L6-v2
```

The model generates **384-dimensional embeddings**.

### 6. Vector Storage

The embeddings are stored in a FAISS index using:

```python
faiss.IndexFlatL2()
```

FAISS performs similarity search between the user's question and stored document chunks.

### 7. Question Processing

When a user asks a question, the question is also converted into an embedding using the same Sentence Transformer model.

### 8. Semantic Search

FAISS compares the question embedding with the stored document embeddings and retrieves the most relevant chunks.

The current implementation retrieves the **top 3 chunks**.

### 9. Context Construction

The retrieved chunks are combined and passed to the Gemini model as context.

### 10. AI Answer Generation

Google Gemini generates the final answer using the retrieved document context.

The prompt instructs the model to answer using the uploaded document information.

```text
User Question
      ↓
Question Embedding
      ↓
FAISS Similarity Search
      ↓
Top 3 Relevant Chunks
      ↓
Context
      ↓
Google Gemini
      ↓
Final Answer
```

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* Axios
* Vite
* HTML5
* CSS

### Backend

* Python
* FastAPI
* Uvicorn
* Pydantic
* pypdf

### AI / Machine Learning

* Sentence Transformers
* `all-MiniLM-L6-v2`
* Google Gemini
* Retrieval-Augmented Generation (RAG)
* Text Embeddings
* Semantic Search

### Vector Database / Search

* FAISS
* `IndexFlatL2`

### Development Tools

* Git
* GitHub
* VS Code
* Postman

## ⚙️ Installation

### Prerequisites

Make sure you have installed:

* Python 3.10+
* Node.js
* npm
* Git

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Document-Intelligence-RAG.git
```

```bash
cd AI-Document-Intelligence-RAG
```

## 🐍 Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

### Create a virtual environment

```bash
python -m venv .venv
```

### Activate the virtual environment

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Windows CMD:

```cmd
.venv\Scripts\activate
```

Linux / macOS:

```bash
source .venv/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

## 🔑 Environment Variables

Create a `.env` file inside the backend directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

The API key should never be committed to GitHub.

Make sure `.env` is included in `.gitignore`:

```gitignore
.env
.venv/
__pycache__/
storage/
*.pyc
```

## ▶️ Run the Backend

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

## ⚛️ Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The React application will normally be available at:

```text
http://localhost:5173
```

## 🔌 API Endpoints

### Upload Document

```http
POST /home
```

Uploads a PDF or TXT document and processes its content.

### Search / Ask Question

```http
GET /search?question=your_question
```

Example:

```text
GET /search?question=What programming languages are mentioned?
```

Example response:

```json
{
  "question": "What programming languages are mentioned?",
  "answer": "The document mentions Python, JavaScript, and SQL.",
  "chunks": [
    "Relevant document chunk..."
  ],
  "distances": [
    1.25,
    1.54,
    1.62
  ]
}
```

## 🧠 Why RAG?

A normal LLM can answer questions based on its training data, but it does not automatically know the contents of a user's private documents.

RAG solves this by retrieving relevant information from the user's documents and providing that information to the LLM before generating the answer.

```text
Traditional LLM

Question
   ↓
LLM
   ↓
Answer
```

With RAG:

```text
Question
   ↓
Embedding
   ↓
Vector Search
   ↓
Relevant Documents
   ↓
LLM + Retrieved Context
   ↓
Grounded Answer
```

This helps the application answer questions based on the uploaded documents rather than relying only on the model's general knowledge.

## 📊 Current Implementation

| Component           | Implementation     |
| ------------------- | ------------------ |
| Frontend            | React.js           |
| Backend             | FastAPI            |
| Document Types      | PDF, TXT           |
| PDF Extraction      | pypdf              |
| Text Cleaning       | Python             |
| Chunking            | 1000-word chunks   |
| Embedding Model     | all-MiniLM-L6-v2   |
| Embedding Dimension | 384                |
| Vector Search       | FAISS              |
| Similarity Metric   | L2 Distance        |
| Retrieved Chunks    | Top 3              |
| LLM                 | Google Gemini      |
| API Communication   | Google GenAI SDK   |
| Vector Storage      | Local FAISS index  |
| Chunk Storage       | Local file storage |

## 🔮 Future Improvements

The project is designed to be extended with additional AI and document-intelligence capabilities.

Planned improvements include:

* [ ] Source citations and document references
* [ ] Page-level citations for PDF documents
* [ ] Improved chunking strategies
* [ ] Chunk metadata management
* [ ] Multiple document management
* [ ] Document-specific search
* [ ] Conversation/chat history
* [ ] Streaming AI responses
* [ ] Document summarization
* [ ] Structured information extraction
* [ ] Document comparison
* [ ] Authentication and authorization
* [ ] Improved frontend chat interface
* [ ] Persistent vector storage
* [ ] Production deployment
* [ ] OCR support for scanned documents

## 🔒 Security

The application uses environment variables for sensitive API credentials.

Never commit:

```text
.env
```

or expose your Gemini API key in frontend code.

The API key should remain on the backend.

## ⚠️ Current Limitations

The current version is primarily designed as a learning and portfolio project.

Current limitations include:

* PDF text extraction depends on the PDF containing extractable text.
* Scanned/image-only PDFs require OCR, which is not currently implemented.
* Chunking currently uses a fixed word-based approach.
* FAISS storage is currently local.
* Generated vector indexes are not persistent across ephemeral deployment environments.
* The current version does not yet maintain page-level source metadata.
* Multi-user document isolation is not implemented yet.

## 🎯 Project Goals

This project was built to gain practical experience with:

* Retrieval-Augmented Generation
* Large Language Models
* Text embeddings
* Vector similarity search
* FAISS
* Document processing
* FastAPI
* React
* AI API integration
* Full-stack AI application development

## 👨‍💻 Author

**Ragupathy V**

B.E. Computer Science and Engineering

### Profiles

* LinkedIn: https://linkedin.com/in/ragupathyv
* GitHub: https://github.com/ragupathy-v

## 📜 License

This project is intended for educational and portfolio purposes.

You may modify and extend the project for learning and development.
