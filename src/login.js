import {React,useState,useEffect} from 'react'
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './styles.css'
import { AppShell,Checkbox,TextInput,Text,Anchor,Notification,PasswordInput,Header,Button, MantineProvider } from '@mantine/core'
export function Login(){
   useEffect(()=>{
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
  };
   },[])
    function auths(){
        if(email.trim()==""||password.trim()==""){
          SetErrorM("Plase enter valid email or passowrd")
      SetOpen(true)
        }else{
          signInWithEmailAndPassword(auth,email,password).then(
            (credentials)=>{
              alert(credentials)
            }
            ).catch(
              (err)=>{
                console.error(err)
       

      console.log(err)
      let reference=err.code.toString()
      let codes=reference.substr(5,reference.length)
      SetErrorM(codes)
      SetOpen(true)
      setTimeout(()=>{SetOpen(false)},2000)
                SetOpen(true)
              }
            )
        }
    }
  const[email,SetEmail]=useState("")
  const[password,SetPassword]=useState("")
  const auth = getAuth()
  const[rember,SetRemember]=useState(false)
  const[isOpen,SetOpen]=useState(false)
  const[erroM,SetErrorM]=useState("")
    return(
        <MantineProvider theme={{colorScheme:'dark'}}>
        
            <AppShell
               header={<Header className='nav' height={60}  >{<><h1 className='logo'>FLEXFLIX <Button component={Link} to="/" style={{float:'right',marginBottom:'-10px',marginTop:'0.5%',marginBottom:'0.5%',background:'#15b089',marginRight:'10vw'}}>
               Sign Up
             </Button></h1>  </>}</Header>}
            >
                <div style={{height:'91vh',background:'#10171E', position: "fixed",display:'flex',alignItems:'center',justifyContent:'center',top:60,right:0,width:'100vw'}}>
                <div style={{width:'30vw',background:'#0f0f0f',marginTop:'-5vh',height:'53vh', minWidth: '306px',
                minHeight:'308px',
    maxWidth: '480px',
    maxHeight: '480px',}}>
      <center><Text style={{fontSize:32,color:"#15B089"}} >Login</Text></center>

<center> <TextInput
  placeholder="Email"
  value={email}
  onChange={(e)=>{SetEmail(e.target.value);console.log(e.target.value)}}
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
<div style={{display:'flex',justifyContent:'center'}}>
<Button onClick={auths} style={{marginTop:30,marginTop:'30px',marginBottom:'0.5%',color:'#ddd',background:'#0f8063'}} >
  Login
</Button>
</div>
<br></br>
<center><Text color={"#ddd"}>Do not have a Account?<Anchor component={Link} to="/">Sign Up</Anchor></Text></center>
      
<div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
</div>
      </div>
      
      {isOpen?<motion.div animate={{right:0}} transition={{duration:0.2,}}   style={{bottom:"2vh",position:"absolute",right:"-474px"}}>
<Notification onClose={()=>{SetOpen(false)}} color={"red"} title="Opps! there seems to be an issue">
  {erroM}
</Notification>
</motion.div> :<motion.div  animate={{MarginRight:'-100%'}}  transition={{duration:0.2}} style={{bottom:"2vh",position:"absolute",right:"-474px"}}>
<Notification  color={"red"} style={{}} title="Opps there is a problem">
{erroM}
</Notification>
</motion.div> }  
</div>
 

            
            
            </AppShell>
        
        </MantineProvider>
    )
}