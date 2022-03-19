import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios  from 'axios'
import { motion } from 'framer-motion'
import { Card,Text,Button,Image,Grid,Group,MantineProvider,Header } from '@mantine/core'
import{MdOutlineArrowBack} from 'react-icons/md'

export const Toprated = () => {

    const navigatation=useNavigate()
    const[toprated,SetTopRated]=useState([])
    const[topratedSets,SetTopRatedSet]=useState([])
  useEffect(async ()=>{
      let uid=localStorage.getItem("uid")
      if(uid != null){
       await axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=b99729f92349edd0060dae0eb8c9a78e&language=en-US&page=1&").then(res=>{
           SetTopRated(res.data.results)
           console.log(res)
           for(let z=0;z<4;z++){
              topratedSets.push(res.data.results[z].title)
              console.log(topratedSets)
           }
       }
       )
       
      }
      else{
          navigatation("/login")
      }
  })  
  return (
      <MantineProvider theme={{colorScheme:'dark'}}>
      <>
      <Header  style={{position:'fixed'}} className='nav' height={60}  >
    <MdOutlineArrowBack color='#fff' size={30} onClick={()=>{navigatation("/home")}} style={{display:'block',cursor:'pointer',position:'absolute',top:'15px',left:10}} />
    
        <h1 className='logo'>FLEXFLIX 
       </h1> 
      
       </Header>
    <div style={{background:'#10171E'}}>
    <center><h1 style={{color:'#fff',marginTop:'5%',fontWeight:'400'}}>Top Rated</h1></center>
           
    
    <Grid columns={6}>
    {
        toprated.map(x=>{
            return(
                <Grid.Col span={6} xs={5} sm={3} lg={2} xl={3}>
                <motion.div whileHover={{scale:1.03,boxShadow:'10px 10px #32343b'}}  style={{marginBottom:'3%',marginTop:'3%',marginLeft:'5%'}}>
             
         
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
            
                    <Button  variant="light" color="blue" fullWidth style={{ marginTop: 14,marginBottom:'3%' }}>
                      WATCH NOW
                    </Button>
                    
                    
                  </Card>
                   
             </motion.div>
             </Grid.Col>
            )
        })
    }
    </Grid>
    hi
    </div>
    </>
    </MantineProvider>
  )
}