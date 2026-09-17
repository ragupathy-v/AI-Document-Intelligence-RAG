import "./Css/App.css"
import Upload from './Components/Upload'

function App() {
  

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 13h6M9 16.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <div className="app-header-text">
          <p className="app-title">AI Document Intelligence</p>
          <p className="app-subtitle">Upload documents and ask questions using AI </p>
        </div>
      </header>
      <Upload/>
    </div>
  )
}

export default App