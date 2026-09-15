
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
         const res= await axios.post("http://127.0.0.1:8000/home",formData)
         setData(res.data.content)
         console.log(res.data)

     }
     catch(err){
        console.log(err)
     }

    }


  return (
    <div>
        
        <input type="file" placeholder="Upload your file" onChange={(e)=>{setFile(e.target.files[0])}} />
        <button onClick={handelUpload}>upload</button>

        <Search/>
        <p>{data}</p>
    </div>
  )
}

export default Upload