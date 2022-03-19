import React,{useEffect, useState} from 'react'
import { getAuth,updateCurrentUser,updateEmail,updateProfile } from 'firebase/auth'
import { Header,Notification,MantineProvider,Avatar,Paper, Button,Input, Loader,Modal,Group } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import{getStorage,deleteObject,ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import { doc,getDoc,deleteDoc } from "firebase/firestore";
import { motion } from 'framer-motion'
import { apps } from './firebase'
import{MdOutlineArrowBack} from 'react-icons/md'


const Profile = () => {
    const[openeM,SetOpeneM]=useState(false)
    const[isOpen,SetOpen]=useState(false)
    const[modalOpen,SetModalM]=useState(false)
    let storage=getStorage()
    let auth=getAuth()
    let user=auth.currentUser;
    let photo
    if(user)
    {
        photo=user.photoURL
    }
    const FileSelectedHandler=async (event)=>{
        SetLoading(true)
        const storageRef = ref(storage,user.uid);
       
        const file=event.target.files[0]
        await uploadBytes(storageRef, file).then((snapshot) => {
            
          getDownloadURL(storageRef).then((url)=>{
              updateProfile(user,{
                  photoURL:url
              })

              window.location.reload(false)
          })
        }).catch(
            (err)=>{
                console.error(err)
                alert("uh ohh")
            }
        );  
    
       
    }
    
    const navigation=useNavigate()
    const[newEmail,SetNewEmail]=useState("")
   const[opacity,SetOpacity]=useState(1)
   const[loading,SetLoading]=useState(true)
   const[logoOpacity,SetLocalOpacity]=useState(0)
   const[erroM,SetErrorM]=useState("hi")
   const deleteUser=()=>{
    deleteObject(ref(storage,user.uid));
    deleteDoc(doc(apps,"users",user.uid));
    user.delete();
    localStorage.removeItem("uid");
    navigation("/")
   }
    useEffect(async()=>{
        const user=localStorage.getItem("uid")
        if(user==null){
            navigation("/login")
        }
        else{
            const dvValues=await getDoc(doc(apps,'users',user)).then(()=>{
                SetLoading(false)
            })
            console.log(dvValues)
        }
    },[])
  return (
      <MantineProvider theme={{colorScheme:'dark'}}>
          {loading?<div>
            <Header className='nav' height={60}  ><MdOutlineArrowBack color='#fff' size={30} style={{display:'block',position:'absolute',top:'15px',left:10}} /><h1 className='logo'>FLEXFLIX</h1></Header>
            <div style={{height:'100vh',background:'#10171E',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Loader/>
                </div>
</div>:
    <><div>  <Header className='nav' height={60}  ><MdOutlineArrowBack color='#fff' size={30} onClick={()=>{navigation("/home")}} style={{display:'block',cursor:'pointer',position:'absolute',top:'15px',left:10}} /><h1 className='logo'>FLEXFLIX</h1></Header> </div>
    <div style={{height:'100vh',background:'#10171E'}}>
    <input htmlFor="files" style={{display:"none"}} type="file" id="files" onChange={FileSelectedHandler} className="hidden"/>
        <Avatar onMouseLeave={()=>{SetOpacity(1);SetLocalOpacity(0)}} size={"150px"} radius="xl" style={{position:'absolute',opacity:opacity,display:'block',top:100,left:40}}  onMouseEnter={()=>{SetOpacity(0.2);SetLocalOpacity(1)}} src={photo} >
          
            </Avatar>
            <input style={{display:"none"}} type="file" id="files" onChange={FileSelectedHandler} className="hidden"/>
            <label onMouseLeave={()=>{SetOpacity(1);SetLocalOpacity(0)}}  onMouseEnter={()=>{SetOpacity(0.2);SetLocalOpacity(1)}} style={{position:'absolute',background:'#1971C2',borderRadius:2,display:'flex',paddingTop:'5px',width:'70px',textAlign:'center',height:30,opacity:logoOpacity,color:'#fff',display:'block',top:150,left:80}}  htmlFor="files"> upload</label>

            {/* <Button htmlFor="files"  onMouseLeave={()=>{SetOpacity(1);SetLocalOpacity(0)}} style={{position:'absolute',opacity:logoOpacity,color:'#fff',display:'block',top:150,left:80}} onMouseEnter={()=>{SetOpacity(0.2);SetLocalOpacity(1)}} >upload</Button> */}
    <Paper className='paper' style={{position:'absolute',display:'block',width:'50%',minHeight:300,height:'50vh',top:'30vh'}}>
        <h1 style={{textAlign:'center',fontWeight:400}}>Account Info</h1><br></br>
        <h3 style={{textAlign:'center'}}>Email:{user.email}</h3><br></br>
       <center> <Button style={{marginTop:'0.5%',marginBottom:'0.5%'}} onClick={()=>{SetOpeneM(true)}}>Change Email</Button></center>
       <br></br>
       <center> <Button style={{marginTop:'0.5%',marginBottom:'0.5%'}} color={"red"} variant="outline" onClick={()=>{alert("no")}}>Delete History</Button></center>
       <br></br>
       <center> <Button style={{marginTop:'0.5%',marginBottom:'0.5%'}} color={"red"} onClick={()=>{SetModalM(true)}}>Delete Account</Button></center>
       <Modal centered  opened={modalOpen} onClose={()=>{SetModalM(false)}} >
            <h1 style={{textAlign:'center'}}>Are You Sure?</h1>
<br></br>
            <Group style={{display:'flex',justifyContent:'center'}}>
                <Button style={{marginTop:'1%',marginBottom:'1%'}} color={"red"} onClick={deleteUser}>
                    Delete
                </Button>
                <Button style={{marginTop:'1%',marginBottom:'1%'}} color={"red"} variant="outline" onClick={()=>{SetModalM(false)}} >
                    Cancel
                </Button>
            </Group>
       </Modal>
       <Modal centered opened={openeM} onClose={()=>{SetOpeneM(false)}} >
    <h2 style={{fontWeight:300}}>new email:</h2>
    <Input value={newEmail} onChange={(e)=>{SetNewEmail(e.target.value)}} />
    <br></br>
   <center> <Button style={{marginTop:'0.5%',marginBottom:'0.5%'}} onClick={async()=>{
       if(newEmail.trim()==""){
           SetOpeneM(false)
           SetOpen(true);
           SetErrorM("enter an email")
           setTimeout(()=>{SetOpen(false)},2000)
       }
       else{
          await  updateEmail(user,newEmail).then(()=>{alert("email updated")}).catch(
               (err)=>{ let reference=err.code.toString();SetOpeneM(false); let codes=reference.substr(5,reference.length);SetOpen(true);SetErrorM(codes);setTimeout(()=>{SetOpen(false)},2000)}
                
           )
       }
   }}>Change</Button></center>
</Modal>

        </Paper>     
    </div></>
}
{isOpen?<motion.div animate={{right:0}} transition={{duration:0.2,}}   style={{bottom:"2vh",position:"absolute",right:"-474px"}}>
<Notification onClose={()=>{SetOpen(false)}} color={"red"} title="Opps! there seems to be an issue">
  {erroM}
</Notification>
</motion.div> :<motion.div  animate={{right:'-478px'}}  transition={{duration:0.2}} style={{bottom:"2vh",position:"absolute",right:"-474px"}}>
<Notification  color={"red"} style={{}} title="Opps there is a problem">
{erroM}
</Notification>
</motion.div> } 
    </MantineProvider>
  
  )
}

export default Profile