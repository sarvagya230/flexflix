import{useState,useEffect} from 'react'
import'./styles.css'
import { AppShell,Anchor,MantineProvider,PasswordInput,Loader,TextInput,Text,Button, Header,Notification } from '@mantine/core';
import{Link,useNavigate} from 'react-router-dom'
import{apps} from './firebase'
import { doc,setDoc, } from 'firebase/firestore';
import firebase from './firebase'
import axios from 'axios';
import {motion} from 'framer-motion'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
function Home() {
  const [userName,SetUserName]=useState("")
  useEffect(async()=>{
 
  })
  const[email,SetEmail]=useState("")
  let navigate = useNavigate();
  const[notloading,SetLoading]=useState(true)
  const[password,SetPassword]=useState("")
  const[comfirmPassword,SetComfirmedPassword]=useState("")
  const auth = getAuth()
  const[isOpen,SetOpen]=useState(false)
  const[erroM,SetErrorM]=useState("")
  async function auths(){
    if(userName.trim()!=""){
    if(comfirmPassword===password){
     SetLoading(false)
    await createUserWithEmailAndPassword(auth,email,password
    ).then((reference)=>{
      const user=setDoc(doc(apps,"users",reference.user.uid),{
        username:userName,
        history:[],

      })
      localStorage.setItem("uid",reference.user.uid)
      SetLoading(true)
      navigate("/home")
    }).catch(
      (err)=>{
        console.error(err)
       SetLoading(true)

      console.log(err)
      let reference=err.code.toString()
      let codes=reference.substr(5,reference.length)
      SetErrorM(codes)
      SetOpen(true)
      setTimeout(()=>{SetOpen(false)},2000)
      }
    )
    }
    else{
      SetErrorM("password donot match")
      SetOpen(true)
    }
  }
  else{
    SetErrorM("Please enter a user name")
    SetOpen(true)
  }
  }

  return (
    <div className='home'>
      <MantineProvider theme={{colorScheme:'dark'}}>
     <AppShell
      padding="md"
      
      header={<Header className='nav' height={60}  >{<><h1 className='logo'>FLEXFLIX <Button component={Link} to="/login" style={{float:'right',marginBottom:'-10px',background:'#15b089',marginRight:'10vw'}}>
      Login
    </Button></h1>  </>}</Header>}
    >
     
    <div style={{height:'91vh',background:'#10171E', position: "fixed",display:'flex',alignItems:'center',justifyContent:'center',top:60,right:0,width:'100vw'}}>
   
      <div  className='signUp'>
      <center><Text style={{fontSize:32,color:"#15B089"}} >Sign Up</Text></center>
     <center> <TextInput
  placeholder="User Name"
  value={userName}
  onChange={(e)=>{SetUserName(e.target.value)
  }}
  style={{width:'50%',marginTop:10}}
  required
/></center>
<center> <TextInput
  placeholder="Email"
  value={email}
  onChange={(e)=>{SetEmail(e.target.value)
  }}
  style={{width:'50%',marginTop:20}}
  required
/></center>
<center> <PasswordInput
  placeholder="Password"
  value={password}
  onChange={(e)=>{SetPassword(e.target.value)}}
  style={{width:'50%',marginTop:20}}
  required
/></center>
<center> <TextInput
  placeholder="Comfirm Password"
  type="password"
  value={comfirmPassword}
  onChange={(e)=>{SetComfirmedPassword(e.target.value)}}
  style={{width:'50%',marginTop:20}}
  required
/></center>
<Button onClick={auths} style={{marginTop:30,color:'#ddd',overflow:'hidden',background:'#0f8063'}} >
  Sign Up
</Button>
<br></br>
<center><Text color={"#ddd"}>Do not have a Account?<Anchor component={Link} to="/login">Login</Anchor></Text></center>

      </div>

    </div>  
    {isOpen?<motion.div animate={{right:0}} transition={{duration:0.2,}}   style={{bottom:"2vh",position:"absolute",right:"-474px"}}>
<Notification onClose={()=>{SetOpen(false)}} color={"red"} title="Opps! there seems to be an issue">
  {erroM}
</Notification>
</motion.div> :<motion.div  animate={{right:'-478px'}}  transition={{duration:0.2}} style={{bottom:"2vh",position:"absolute",right:"-474px"}}>
<Notification  color={"red"} style={{}} title="Opps there is a problem">
{erroM}
</Notification>
</motion.div> }  
    {notloading?<></>:<div className='loaders'><Loader/></div>}
    </AppShell>
    </MantineProvider>
    </div>
  )
  ;
}

export default Home;
