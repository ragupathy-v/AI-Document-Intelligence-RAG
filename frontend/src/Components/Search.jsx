import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import ReactMarkdown from "react-markdown"

import "../Css/Search.css"
import {base_url,test_url} from "../variables.jsx"

function Search() {
 const[question,setQuestion]=useState("")
 const[answer,setAnswer]=useState("")
 
    const handelsearch= async()=>{
        try{
            const res= await axios.get(`${base_url}/search`,{params: { question } })
            console.log(res)
            setAnswer(res.data.answer)
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <section className="card search-card">

        <div className="card-heading">
            <span className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.6" />
                    <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
            </span>
            <div className="card-heading-text">
                <h2 className="card-title">Ask something about your uploaded document...</h2>
            </div>
        </div>
        <div className="search-controls">
            <div className="input-field">
                <span className="input-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.6" />
                        <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                </span>
                <input className="text-input" placeholder="Enter your question..." value={question} onChange={(e)=>{setQuestion(e.target.value)}}/>
            </div>
            <button className="btn btn-primary" onClick={handelsearch} disabled={!question}>Search</button>
        </div>
        {answer && <p className="search-question">question: {question}</p>}
        <div className="answer-block">
        {answer &&   <p className="answer-label">answer:</p>}
            <div className="answer-content">
                <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
        </div>
    </section>
  )
}

export default Search