import "../Css/Upload.css"
import{useState} from 'react'
import axios from 'axios'
import Search from './Search'
function Upload() {

    const [file,setFile]=useState(null)
    const [data,setData]=useState(null)
     const handelUpload= async()=>{
        try{
            const formData= new FormData()
            formData.append('file',file)
         const res= await axios.post("https://8000-dep-01m2m8kb8k5rext9my9dw13ykt-d.cloudspaces.litng.ai/home",formData)
         setData(res.data.content)
         console.log(res.data)

     }
     catch(err){
        console.log(err)
     }

    }


  return (
    <div className="upload-page">
        <section className="card upload-card">
            <h2 className="card-title">Upload a document</h2>
            <p className="card-hint">Add a file to index it for search and Q&amp;A.</p>
            <div className="upload-controls">
                <input className="file-input" type="file" placeholder="Upload your file" onChange={(e)=>{setFile(e.target.files[0])}} />
                <button className="btn btn-primary" onClick={handelUpload} disabled={!file}>Upload</button>
            </div>
            {data && (
                <div className="upload-result">
                    
                    <p className="upload-result-text">file data extracted and ready to answer</p>
                </div>
            )}
        </section>

        <Search/>
    </div>
  )
}

export default Upload