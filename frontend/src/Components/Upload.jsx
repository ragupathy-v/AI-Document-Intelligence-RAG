import "../Css/Upload.css"
import{useState} from 'react'
import axios from 'axios'
import Search from './Search'
import {base_url,test_url} from '../variables'
function Upload() {

    const [file,setFile]=useState(null)
    const [data,setData]=useState({})
     const handelUpload= async()=>{
        try{
            const formData= new FormData()
            formData.append('file',file)
         const res= await axios.post(`${base_url}/home`,formData)
         setData(res.data)
         console.log(res.data)

     }
     catch(err){
        console.log(err)
     }

    }


  return (
    <div className="upload-page">
        <section className="card upload-card">
            <div className="card-heading">
                <span className="card-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 16V4m0 0L8 8m4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                </span>
                <div className="card-heading-text">
                    <h2 className="card-title">Upload a document</h2>
                    <p className="card-hint">Add a file to index it for search and Q&amp;A.</p>
                </div>
            </div>
            <div className="upload-controls">
                <input className="file-input" type="file" placeholder="Upload your file" onChange={(e)=>{setFile(e.target.files[0])}} />
                <button className="btn btn-primary" onClick={handelUpload} disabled={!file}>Upload</button>
            </div>
            {data && (
                <div className="upload-result">
                    <div className="upload-meta">
                        {data.chunks_count &&<p>Number of chunkes create : {data.chunks_count}</p>}
                        {data.filename && <p>Filename : {data.filename}</p>}
                    </div>
                    {data.message && <p className="upload-result-text">{data.message}</p>}
                </div>
            )}
        </section>

        <Search/>
    </div>
  )
}

export default Upload