import React from 'react'
import Me from './me.png'
import { Center } from '@mantine/core'
import { motion } from 'framer-motion'
import Wave from 'react-wavify'
import './styles.css'
export const About = () => {
  return (
    <div style={{width:'100vw',background:'#1A1B1E',height:'100vh'}}>
          <center>
        <Center style={{ width: 400, height: 200 }}>
      <h1 style={{color:'#6A69F4',display:'block',alignItems:'center'}}> Hi! I Am Sarvagya</h1>
        </Center>
        </center>
        <h3 style={{textAlign:'center',marginTop:'-10px',color:'#eee'}}>I’m a Software Developer <br></br>specializing in React, Responsive web design, CSS, HTML, and Javascript</h3>
        <br></br>
        <motion.div  whileHover={{ scale: 1.2 }} style={{width:'15vw',height:'30vh',borderRadius:'30px',backgroundColor:'#aaa',marginLeft:'25vw',background:'#fff'}}>
      <img src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png" style={{height:'80%', display: 'block',marginLeft:'auto',marginRight:'auto',marginTop:'10%'}}></img>
    </motion.div>
    <motion.div   whileHover={{ scale: 1.2 }} style={{width:'15vw',height:'30vh',borderRadius:'30px',backgroundColor:'#aaa',marginLeft:'42vw',marginTop:'-30vh',background:'#fff'}}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/640px-CSS3_logo_and_wordmark.svg.png" style={{height:'80%', display: 'block',marginLeft:'auto',marginRight:'auto',marginTop:'10%'}}></img>
    </motion.div>
    <motion.div  whileHover={{ scale: 1.2 }} style={{width:'15vw',height:'30vh',borderRadius:'30px',backgroundColor:'#aaa',marginTop:'-30vh',marginLeft:'60vw',marginBottom:'10vh',background:'#fff'}}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" style={{height:'80%', display: 'block',marginLeft:'auto',marginRight:'auto',marginTop:'10%'}}></img>
    </motion.div>
        <img  style={{pointerEvents:'none',opacity:1,display:'block',height:'300px',marginTop:'-400px',marginRight:'-10%'}} src={Me}></img>
        <Wave fill='#6A69F4'
        paused={false}
        style={{display:'block',position:'absolute',bottom:0}}
        options={{
          height: 10,
          amplitude: 20,
          speed: 0.25,
          points: 3
        }}
  />
    </div>
  )
}
