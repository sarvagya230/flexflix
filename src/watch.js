import React from 'react'
import { useState, useEffect } from "react"
import { Loader } from '@mantine/core';
import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios';
export const Watch = () => {
  const[title,SetTitle]=useState("")
  const navigation=useNavigate()
  const prams=useParams()
  let [banner,SetBanner]=useState("")
  let [ratting,SetRatting]=useState(0)
  let [loading,SetLoading]=useState(false)
  useEffect(()=>{
    const user=localStorage.getItem("uid")

    if(user==null){
        navigation("/login")
    }
    else{
      axios.get(`https://www.omdbapi.com/?apikey=bab027b0&t=${prams.id}`).then(res =>{ SetBanner(res.data.Poster)
    if(res.data.Response=="False"){
      navigation("/no-movie-found")
    }
      ;SetLoading(true);console.log(res.data);SetRatting(res.data.Ratings[0].Value);SetTitle(res.data.Title);if(res.data.Response=="False"){alert("movie not found")}})
    }

  },[])
  return (
    <>
    {
      loading?
    <div style={{height:'100vh',display:'flex',justifyContent:'center',background:'#10171E'}}>
    <h1 style={{position:'absolute',top:'10%',zIndex:2,color:'#fff'}} >{title}</h1>
   
    <br></br>
    <h3 style={{position:'absolute',top:'17%',fontWeight:400,zIndex:2,color:'#fff'}} >IMDB: {ratting}</h3>
    <img 
     onError={({ currentTarget }) => {
      currentTarget.onerror = null; // prevents looping
      currentTarget.src="https://i.ibb.co/yVp95TJ/download-11.png";
    }}
     style={{position:'absolute',top:'10%',left:'3vw',color:'#fff'}} src={banner}></img>
    </div>:<div style={{background:'#000',display:'flex',justifyContent:'center',height:'100vh',alignItems:'center'}}>
      <Loader/>
    </div>
}
    </>
  )
}
