import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import ReactMarkdown from "react-markdown"

function Search() {
 const[question,setQuestion]=useState("")
 const[answer,setAnswer]=useState("")

    const handelsearch= async()=>{
        try{
            const res= await axios.get("http://127.0.0.1:8000/search",{params: { question } })
            console.log(res)
            setAnswer(res.data.answer)
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div>Search
        <input placeholder="Enter your question..." value={question} onChange={(e)=>{setQuestion(e.target.value)}}/>
        <button onClick={handelsearch}>Search</button>
        <p>question:{question}</p>
        <p>answer:</p><ReactMarkdown>{answer}</ReactMarkdown>
    </div>
  )
}

export default Search