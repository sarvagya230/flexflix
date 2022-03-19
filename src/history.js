import React,{useEffect, useState} from 'react'
import { apps } from './firebase'
import{Card,Group,Image,Text,Header,Loader,Button, Grid,MantineProvider} from '@mantine/core'
import{ doc,getDoc} from 'firebase/firestore'
import{MdOutlineArrowBack} from 'react-icons/md'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
export const History = (props) => {
    const navigatation=useNavigate()
    let auth=getAuth()
    let user=auth.currentUser;
    let [history,SetHistory]=useState([])
    const[open,SetOpen]=useState(false)
    const[loading,SetLoading]=useState(false)
    useEffect(()=>{

        let uid=localStorage.getItem("uid")
        if(uid==null){
            navigatation("/home")
        }
        else{
            user=localStorage.getItem("uid")
        getDoc(doc(apps,"users",uid)).then((snapshot)=>{

                SetHistory(snapshot.data().history)
                    SetLoading(true)
                
               
            
            
        })
    }
        
    },history)
  return (
      <>
      {loading?
      <MantineProvider theme={{colorScheme:'dark'}}>
    <div style={{background:'#10171E',minHeight:'100vh',overflowY:'hidden'}}>
    <Header  style={{position:'fixed'}} className='nav' height={60}  >
    <MdOutlineArrowBack color='#fff' size={30} onClick={()=>{navigatation("/home")}} style={{display:'block',cursor:'pointer',position:'absolute',top:'15px',left:10}} />
    
        <h1 className='logo'>FLEXFLIX 
       </h1> 
      
       </Header>
        <center><h1 style={{color:'#fff',marginTop:'5%',fontWeight:'400'}}>History</h1></center>
        <Grid columns={6}>
        {
            history.map(x=>{
                return(
                   <Grid.Col  style={{overflowY:'hidden'}}  span={6} xs={5} sm={3} lg={2} xl={3}>
                    <motion.div whileHover={{scale:1.03}} style={{marginBottom:'0%',marginTop:'0%',marginLeft:'5%',display:'inline-grid',flexDirection:'row'}}>
                    <Card  shadow="sm" p="lg">
                    <Card.Section>
                      <Image  src={`https://image.tmdb.org/t/p/original${x.poster_path}`} height={160} alt={x.title} />
                    </Card.Section>
            
                    <Group position="apart" style={{ marginBottom: 5 }}>
                      <Text weight={500}>{x.title}</Text>
                     
                      
                    </Group>
            
                    <Text size="sm" style={{  lineHeight: 1.5,textOverflow: "ellipsis",height:'100px',width:'100%',overflow:'hidden' }}>
                     {x.overview}
                    </Text>
            
                    <Button onClick={()=>{ navigatation(`/watch=${x.title}`)}}  variant="light" color="blue" fullWidth style={{ marginTop: 14,marginBottom:'3%' }}>
                      WATCH AGAIN
                    </Button>
                    
                    
                  </Card>
                  </motion.div>
                  </Grid.Col>
                )
            })

        }
       </Grid>
    </div>
    </MantineProvider>:<div style={{background:'#000',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Loader/>
        </div>}</>
  )
}
