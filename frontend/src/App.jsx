import "./Css/App.css"
import Upload from './Components/Upload'

function App() {
  

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="app-title">Ai agent</p>
        <p className="app-subtitle">AI Document Intelligence &amp; Knowledge Assistant</p>
      </header>
      <Upload/>
    </div>
  )
}

export default App