import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import ReactMarkdown from "react-markdown"

import "../Css/Search.css"

function Search() {
 const[question,setQuestion]=useState("")
 const[answer,setAnswer]=useState("")

    const handelsearch= async()=>{
        try{
            const res= await axios.get("https://8000-dep-01m2m8kb8k5rext9my9dw13ykt-d.cloudspaces.litng.ai/search",{params: { question } })
            console.log(res)
            setAnswer(res.data.answer)
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <section className="card search-card">
        <h2 className="card-title">Ask a question</h2>
        <div className="search-controls">
            <input className="text-input" placeholder="Enter your question..." value={question} onChange={(e)=>{setQuestion(e.target.value)}}/>
            <button className="btn btn-primary" onClick={handelsearch} disabled={!question}>Search</button>
        </div>
        <p className="search-question">question: {question}</p>
        <div className="answer-block">
            <p className="answer-label">answer:</p>
            <div className="answer-content">
                <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
        </div>
    </section>
  )
}

export default Search