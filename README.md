# AI Document Intelligence & Knowledge Assistant

An AI-powered document question-answering application that allows users to upload PDF or TXT documents and ask questions about their content.

The application uses **Retrieval-Augmented Generation (RAG)** to retrieve relevant document chunks using semantic search and generate grounded answers using Google Gemini.

## 🚀 Live Demo

**Frontend:**
`https://ai-document-intelligence-rag.vercel.app/`

**Backend API:**
`https://8000-dep-01m2m8kb8k5rext9my9dw13ykt-d.cloudspaces.litng.ai`

**GitHub Repository:**
`https://github.com/ragupathy-v/AI-Document-Intelligence-RAG`

> The frontend is deployed on Vercel and the FastAPI backend is deployed on Lightning AI.

---

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
* 🌐 Vercel frontend deployment
* ☁️ Lightning AI FastAPI backend deployment
* 🔐 Gemini API key managed using environment variables
* 🔗 Frontend/backend communication using Vite environment variables

---

## 🏗️ Architecture

```text
                         ┌─────────────────────────┐
                         │     React Frontend      │
                         │       Vercel            │
                         │                         │
                         │ Upload + Search UI      │
                         └────────────┬────────────┘
                                      │
                                      │ HTTPS
                                      ▼
                         ┌─────────────────────────┐
                         │     FastAPI Backend     │
                         │     Lightning AI        │
                         └────────────┬────────────┘
                                      │
                     ┌────────────────┴────────────────┐
                     │                                 │
                     ▼                                 ▼
          ┌─────────────────────┐          ┌─────────────────────┐
          │ Document Processing │          │   User Question     │
          └──────────┬──────────┘          └──────────┬──────────┘
                     │                                │
                     ▼                                ▼
          ┌─────────────────────┐          ┌─────────────────────┐
          │   Text Extraction   │          │  Query Embedding    │
          │      PDF / TXT      │          │      MiniLM         │
          └──────────┬──────────┘          └──────────┬──────────┘
                     │                                │
                     ▼                                ▼
          ┌─────────────────────┐          ┌─────────────────────┐
          │    Text Cleaning    │          │    FAISS Search     │
          └──────────┬──────────┘          └──────────┬──────────┘
                     │                                │
                     ▼                                ▼
          ┌─────────────────────┐          ┌─────────────────────┐
          │    Text Chunking    │─────────▶│    Top-K Chunks     │
          └──────────┬──────────┘          └──────────┬──────────┘
                     │                                │
                     ▼                                ▼
          ┌─────────────────────┐          ┌─────────────────────┐
          │     Embeddings      │          │    Gemini LLM       │
          │  all-MiniLM-L6-v2   │─────────▶│    Final Answer     │
          └──────────┬──────────┘          └─────────────────────┘
                     │
                     ▼
          ┌─────────────────────┐
          │    FAISS Index      │
          └─────────────────────┘
```

---

## 🔄 RAG Workflow

The application follows these steps:

### 1. Document Upload

The user uploads a PDF or TXT document through the React frontend.

The frontend sends the document to the FastAPI backend using a multipart form request.

### 2. Text Extraction

The FastAPI backend extracts text from the uploaded document.

For PDF files, `pypdf` is used to extract text from each page.

TXT files are decoded using UTF-8.

### 3. Text Cleaning

The extracted text is cleaned by:

* Removing unnecessary line breaks
* Removing extra whitespace
* Normalizing the extracted text

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

FAISS performs vector similarity search between the user's question and stored document embeddings.

### 7. Question Processing

When a user asks a question, the question is converted into an embedding using the same Sentence Transformer model.

### 8. Semantic Search

FAISS compares the question embedding with the stored document embeddings and retrieves the most relevant chunks.

The current implementation retrieves the **top 6 chunks**.

```text
User Question
      ↓
Question Embedding
      ↓
FAISS Similarity Search
      ↓
Top 6 Relevant Chunks
```

### 9. Context Construction

The retrieved chunks are combined into a context and passed to Google Gemini.

### 10. AI Answer Generation

Google Gemini generates the final answer using the retrieved document context.

The prompt instructs the model to answer using only information available in the retrieved document chunks.

```text
User Question
      ↓
Question Embedding
      ↓
FAISS Similarity Search
      ↓
Top 6 Relevant Chunks
      ↓
Context
      ↓
Google Gemini
      ↓
Final Answer
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* Axios
* Vite
* HTML5
* CSS
* React Markdown

### Backend

* Python
* FastAPI
* Uvicorn
* Pydantic
* pypdf
* Python dotenv

### AI / Machine Learning

* Sentence Transformers
* `all-MiniLM-L6-v2`
* Google Gemini
* Retrieval-Augmented Generation (RAG)
* Text Embeddings
* Semantic Search

### Vector Search

* FAISS
* `IndexFlatL2`

### Deployment

* Vercel — React frontend
* Lightning AI — FastAPI backend

### Development Tools

* Git
* GitHub
* VS Code
* Postman

---

## 📁 Project Structure

```text
AI-Document-Intelligence-RAG/
│
├── Fastapi/
│   ├── main.py
│   ├── Datacleaning.py
│   ├── variable.py
│   ├── requirements.txt
│   └── storage/
│       ├── faiss.index
│       └── chunk storage
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### Prerequisites

Make sure you have installed:

* Python 3.10+
* Node.js
* npm
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/ragupathy-v/AI-Document-Intelligence-RAG.git
```

```bash
cd AI-Document-Intelligence-RAG
```

---

# 🐍 Backend Setup

Navigate to the FastAPI directory:

```bash
cd Fastapi
```

### Create a Virtual Environment

```bash
python -m venv .venv
```

### Activate the Virtual Environment

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

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `Fastapi` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

The Gemini API key should never be committed to GitHub.

Make sure `.env` is included in `.gitignore`:

```gitignore
.env
.venv/
__pycache__/
storage/
*.pyc
```

---

## ▶️ Run the Backend Locally

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

---

# ⚛️ Frontend Setup

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

---

## 🌐 Frontend Environment Variable

The frontend uses a Vite environment variable to communicate with the FastAPI backend.

Create:

```text
frontend/.env
```

For local development:

```env
VITE_API_URL=http://127.0.0.1:8000
```

For the deployed frontend, configure:

```env
VITE_API_URL=https://8000-dep-01m2m8kb8k5rext9my9dw13ykt-d.cloudspaces.litng.ai
```

The `VITE_API_URL` variable contains the backend URL and does **not** contain secret API credentials.

---

# ☁️ Deployment

## Frontend — Vercel

The React frontend is deployed on Vercel.

The frontend communicates with the FastAPI backend through:

```text
VITE_API_URL
```

Deployment flow:

```text
React
  ↓
Vercel
  ↓
Lightning AI FastAPI API
```

## Backend — Lightning AI

The FastAPI backend is deployed on Lightning AI.

Backend endpoint:

```text
https://8000-dep-01m2m8kb8k5rext9my9dw13ykt-d.cloudspaces.litng.ai
```

The deployment uses:

```text
Machine: Default CPU
Autoscaling: 0–1 replicas
Port: 8000
Authentication: None
```

The FastAPI server is started using:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The deployment can scale down when inactive and start when requests are received.

---

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
  "distence": [
    1.25,
    1.54,
    1.62
  ]
}
```

---

## 🧠 Why RAG?

A normal LLM can answer questions using its training knowledge, but it does not automatically know the contents of a user's private documents.

RAG solves this by retrieving relevant information from the user's documents and providing that information to the LLM before generating an answer.

### Traditional LLM

```text
Question
   ↓
LLM
   ↓
Answer
```

### RAG

```text
Question
   ↓
Embedding
   ↓
Vector Search
   ↓
Relevant Document Chunks
   ↓
LLM + Retrieved Context
   ↓
Grounded Answer
```

This allows the application to generate answers based on the uploaded document rather than relying only on the model's general knowledge.

---

## 📊 Current Implementation

| Component            | Implementation     |
| -------------------- | ------------------ |
| Frontend             | React.js           |
| Frontend Deployment  | Vercel             |
| Backend              | FastAPI            |
| Backend Deployment   | Lightning AI       |
| Document Types       | PDF, TXT           |
| PDF Extraction       | pypdf              |
| Text Cleaning        | Python             |
| Chunking             | 1000-word chunks   |
| Embedding Model      | all-MiniLM-L6-v2   |
| Embedding Dimension  | 384                |
| Vector Search        | FAISS              |
| Similarity Metric    | L2 Distance        |
| Retrieved Chunks     | Top 6              |
| LLM                  | Google Gemini      |
| API Communication    | Google GenAI SDK   |
| Vector Storage       | Local FAISS index  |
| Chunk Storage        | Local file storage |
| Backend Server       | Uvicorn            |
| Frontend HTTP Client | Axios              |

---

## 🔮 Future Improvements

The project can be extended with additional AI and document-intelligence capabilities.

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
* [ ] OCR support for scanned documents
* [ ] RAG evaluation and retrieval-quality metrics

---

## 🔒 Security

The application uses environment variables for sensitive API credentials.

Never commit:

```text
.env
```

or expose the Gemini API key in frontend code.

The Gemini API key remains on the backend.

The frontend only uses:

```text
VITE_API_URL
```

to identify the FastAPI backend.

---

## ⚠️ Current Limitations

The current version is primarily designed as a learning and portfolio project.

Current limitations include:

* PDF text extraction depends on the PDF containing extractable text.
* Scanned/image-only PDFs require OCR, which is not currently implemented.
* Chunking currently uses a fixed word-based approach.
* FAISS storage is currently local.
* Vector indexes and chunk storage depend on the deployment environment's local storage.
* The current version does not yet maintain page-level source metadata.
* Multi-user document isolation is not implemented yet.
* Authentication is not currently implemented for application users.
* The Lightning AI deployment may sleep when inactive.

---

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
* Cloud deployment

---

## 👨‍💻 Author

**Ragupathy V**

B.E. Computer Science and Engineering

### Profiles

* LinkedIn: https://linkedin.com/in/ragupathyv
* GitHub: https://github.com/ragupathy-v

---

## 📜 License

This project is intended for educational and portfolio purposes.

You may modify and extend the project for learning and development.
