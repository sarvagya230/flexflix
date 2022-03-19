import { useState,useEffect,useRef } from "react";
import{useNavigate} from 'react-router-dom'
import { Loader,Grid,MantineProvider,Header,Group,Input,Card,Image,Text,Avatar,Badge,Button,Anchor,Tooltip, Center } from "@mantine/core";
import {Link} from 'react-router-dom';
import { apps } from "./firebase";
import { motion } from "framer-motion";
import axios from "axios";
import{CgProfile} from 'react-icons/cg'
import { useClickOutside } from "@mantine/hooks";
import{getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {getAuth,updateProfile } from 'firebase/auth';
import{AiOutlineHistory,AiOutlineSearch,AiOutlineRight} from 'react-icons/ai'
import { setDoc, doc,getDoc } from "firebase/firestore";
import {FcAbout} from 'react-icons/fc'
export default function Dashbord(){
    const navigation=useNavigate()
    const[trendings,SetTrendings]=useState([])
    const[history,SetHistory]=useState([])
    const[topratedSet,Settoprated]=useState([])
    const[trendingOpen,SetTrendingOpen]=useState(false)
    const[seeMore,SetSeaMore]=useState("See More >")
    const refe = useClickOutside(() => SetOpen(false));
    let auth=getAuth()
    let storage=getStorage()
    let user=auth.currentUser;
    let dbValues="smith";
    let [banner,SetBanner]=useState("")
    let[backText,SetBackText]=useState("")
    let numbers=[1,2,3,4,5]
    const[open,SetOpen]=useState(false)
    const[loading,SetLoading]=useState(true)
    const[isLogin,SetLogin]=useState(false)
    const[trending,SetTrending]=useState("")
    const[userName,SetUserName]=useState("")
    const[trendingOpacit,SetTrendingOpacity]=useState(1)
    const[trendinText,SetTrendingText]=useState("Movies")
    const[name,SetName]=useState("")
    const[describtion,SetDescribtion]=useState("")
    const[movie,SetMovies]=useState([])
    const[search,SetSearch]=useState("")
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
    useEffect(async()=>{
   
      await axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=b99729f92349edd0060dae0eb8c9a78e&language=en-US&page=1&").then(
        res=>{
        for(let z=0;z<4;z++){
          topratedSet.push(res.data.results[z])
          console.log(topratedSet)
       }
        }
      )
        await axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=b99729f92349edd0060dae0eb8c9a78e").then((val)=>{
            for(let i=0;i<val.data.results.length-1;i++){
                if(val.data.results[i].title && val.data.results[i].poster_path){
                       movie.push(val.data.results[i])
                         if(i<4){
                           trendings.push(val.data.results[i])
                       }
                   
              
                }
            }
           
        })

    },movie)
    useEffect(async ()=>{
        const user=localStorage.getItem("uid")

        if(user==null){
            navigation("/login")
        }
        else{
            dbValues=await  getDoc(doc(apps,"users",user)).then((snapShot)=>{
              SetUserName(snapShot.data().username)
              SetHistory(snapShot.data().history)
            })
           
            const moviesApi=await axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=b99729f92349edd0060dae0eb8c9a78e").then((val)=>{console.log(val)
            const ApiCall=axios.get(`https://www.omdbapi.com/?apikey=bab027b0&t=${val.data.results[0].title}`).then(
                res=>{SetBanner(res.data.Poster);SetName(res.data.Title);SetDescribtion(res.data.Plot);console.log(res.data);SetLoading(false);console.log(banner)}
            )})
            
            
        }
    },[])

    return(
        <>
{
    loading?
    <MantineProvider theme={{colorScheme:'dark'}}>
    <div style={{opacity:1}} className='loaders'><Loader/></div>
    </MantineProvider>:<div>

        <MantineProvider theme={{colorScheme:'dark'}}>

        <Header style={{position:'fixed'}} className='nav' height={60}  ><h1 className='logo'>FLEXFLIX 
       
        </h1>   <Avatar radius="xl" onMouseEnter={()=>{SetOpen(true)}} onMouseLeave={()=>{SetOpen(false)}} src={user.photoURL} component="a" style={{cursor:'pointer',position:'fixed',zIndex:3,marginTop:'auto',right:'10vw'}} ></Avatar>
       
        </Header>
       <div style={{display:'flex',marginLeft:'35vw'}}> <center><Input icon={<AiOutlineSearch/>}
       onChange={(e)=>{SetSearch(e.target.value)}}
       placeholder="Search"
       onKeyPress={event => {
        if (event.key === 'Enter') {
         
          SetLoading(false)
          navigation(`/watch=${search}`)
          
        }
      }}
       value={search}
       style={{display:'block',width:'30%',position:'fixed',zIndex:3,top:13}}/></center>
       </div> <div style={{display:'block',position:'absolute',background:'#10171E'}}>
        <div className="showcase" style={{display:'flex',flexDirection:'column',backgroundImage:`linear-gradient(rgba(0,0,0,.0), rgba(0,0,0,.0)), url("${banner}")`,backgroundSize:'100% 60%',alignItems:'center',justifyItems:'left'}}>
           <div  style={{width:'52%',minWidth:400,marginLeft:'0vw',borderRadius:20,background:'rgba(0,0,0,0.9)',marginTop:'20vh'}}>
            <h1 style={{color:"teal",paddingLeft:'20%',textAlign:'start'}}>{name}</h1><br></br>
            <h3 style={{color:"#ddd",textAlign:'center',paddingLeft:'20'}}>{describtion}</h3>
          
            <Button onClick={()=>{navigation(`/watch=${name}`)}} style={{marginLeft:'25vw',marginBottom:'2%'}} color={"teal"}>
                watch now!
            </Button>
            </div>
        </div>
        <h1 style={{color:'#fff',textAlign:'center',paddingTop:'1%'}}>{trendinText}</h1>
       <h3 style={{paddingLeft:'3vw',color:'teal',marginBottom:'-1%',opacity:trendingOpacit}}>Trending</h3>
        <Anchor onClick={()=>{SetLoading(true);if(trendingOpen){SetTrendingText("Movies");SetTrendingOpacity(1);SetSeaMore("See  More");SetTrendingOpen(false);SetTrendingOpen(false)}else{SetTrendingText("Trending");SetTrendingOpacity(0);SetSeaMore("Go Back");SetTrendingOpen(true);SetTrendingOpen(true)};SetLoading(false)}} style={{display:'block',marginTop:'-5vh',position:'absolute',right:'5vw'}}>
            {seeMore}
        </Anchor>
        <div style={{display:'flex',overflowY:'hidden',flexDirection:'row',justifyContent:'center',width:'100vw'}}>
         
        <Grid style={{alignItems:'center',overflowY:'hidden' }} columns={6} >
           
            {


                trendingOpen?
                
                movie.map(x=>{
                    return(
                      <Grid.Col span={6} xs={5} sm={3} lg={2} xl={3} >
                      <motion.div whileHover={{scale:1.03,boxShadow:'10px 10px #32343b'}}  style={{marginBottom:'3%',marginTop:'3%',marginLeft:'6%'}}>
                 <Card shadow="sm" p="lg" style={{height:'20%'}}>
                 <Card.Section>
                   <Image src={`https://image.tmdb.org/t/p/original${x.poster_path}`} height={160} alt="Norway" />
                 </Card.Section>
         
                 <Group position="apart" style={{ marginBottom: 5 }}>
                   <Text weight={500}>{x.title}</Text>
                  
                   <Badge color="teal" variant="light">
                     trending
                   </Badge>
                 </Group>
         
                 <Text size="sm" style={{  lineHeight: 1.5,height:'100px',width:'100%',overflowY:'hidden' }}>
                  {x.overview}
                 </Text>
         
                 <Button onClick={()=>{
                    navigation(`/watch=${x.title}`)
                    history.push(x)
                    let unique = [...new Set(history)];
                    setDoc(doc(apps,"users",user.uid),{
                      history:unique
                    })
                    console.log(unique)
                    
                 }} variant="light" color="blue" fullWidth style={{ marginTop: 14,marginBottom:'5%' }}>
                   WATCH NOW
                 </Button>
                 
              <Button  variant="light" color="gray"  radius={"xl"} >+
                 </Button>
               </Card>
               </motion.div>  </Grid.Col>)
               }):
                trendings.map(x=>{
                    return(
                      <Grid.Col span={6} xs={5} sm={3} lg={2} xl={3} >
                      <motion.div whileHover={{scale:1.03,boxShadow:'10px 10px #32343b'}}   style={{marginBottom:'3%',marginTop:'3%',marginLeft:'5%'}}>
                 <Card  shadow="sm" p="lg">
                 <Card.Section>
                   <Image src={`https://image.tmdb.org/t/p/original${x.poster_path}`} height={160} alt="Norway" />
                 </Card.Section>
         
                 <Group position="apart" style={{ marginBottom: 5 }}>
                   <Text weight={500}>{x.title}</Text>
                  
                   <Badge color="teal" variant="light">
                     trending
                   </Badge>
                 </Group>
         
                 <Text size="sm" style={{  lineHeight: 1.5,textOverflow: "ellipsis",height:'100px',width:'100%',overflow:'hidden' }}>
                  {x.overview}
                 </Text>
         
                 <Button onClick={()=>{
                    navigation(`/watch=${x.title}`)
                    history.push(x)
                    let unique = [...new Set(history)];
                    setDoc(doc(apps,"users",user.uid),{
                      history:unique
                    })
                    console.log(unique)
                    
                 }} variant="light" color="blue" fullWidth style={{ marginTop: 14,marginBottom:'3%' }}>
                   WATCH NOW
                 </Button>
                 
                 <Button variant="light" color="gray"  radius={"xl"} >+
                 </Button>
               </Card> 
               </motion.div>
              </Grid.Col>
               )
               })        
            }
    </Grid>
    
    </div>
    <h1 style={{paddingLeft:'3vw',color:'teal',marginBottom:'-1%',opacity:trendingOpacit}}>Top rated</h1>
    <Anchor href="/toprated" style={{display:'block',opacity:trendingOpacit,marginTop:'-5vh',position:'absolute',right:'5vw'}}>
            {seeMore}
        </Anchor> 
        {trendingOpen?<div></div>:
    <Grid columns={6} >
     
    {

    topratedSet.map(x=>{
        return(
          <Grid.Col span={6} xs={5} sm={3} lg={2} xl={3} >
          <motion.div whileHover={{scale:1.03,boxShadow:'10px 10px #32343b'}}   style={{marginBottom:'3%',marginTop:'3%',marginLeft:'5%'}}>
     <Card  shadow="sm" p="lg">
     <Card.Section>
       <Image src={`https://image.tmdb.org/t/p/original${x.poster_path}`} height={160} alt="Norway" />
     </Card.Section>

     <Group position="apart" style={{ marginBottom: 5 }}>
       <Text weight={500}>{x.title}</Text>
      
       <Badge color="red" variant="light">
         top rated
       </Badge>
     </Group>

     <Text size="sm" style={{  lineHeight: 1.5,textOverflow: "ellipsis",height:'100px',width:'100%',overflow:'hidden' }}>
      {x.overview}
     </Text>

     <Button onClick={()=>{
        navigation(`/watch=${x.title}`)
        history.push(x)
        let unique = [...new Set(history)];
        setDoc(doc(apps,"users",user.uid),{
          history:unique
        })
        console.log(unique)
        
     }} variant="light" color="blue" fullWidth style={{ marginTop: 14,marginBottom:'3%' }}>
       WATCH NOW
     </Button>
     
     <Button variant="light" color="gray"  radius={"xl"} >+
     </Button>
   </Card> 
   </motion.div>
  </Grid.Col>
   )

   })
  
    }

    </Grid>
}
  </div>
        {
            open?<motion.div onMouseEnter={()=>{SetOpen(true)}}   onMouseLeave={()=>{SetOpen(false)}} transition={{duration:0.2}} style={{minWidth:'250px',width:'20vw',right:'10vw',position:'fixed',marginRight:'-120px',zIndex:3,background:'#2C2E33',borderRadius:13,top:40}} animate={{height:'260px',opacity:1}} >
                
                <Avatar radius="xl" size={"lg"} style={{left:'5%'}} src={user.photoURL} ></Avatar><h3 style={{paddingLeft:'30%',fontWeight:'400',fontFamily:'Arial, sans-serif',color:'#DDDDDD',marginTop:'-13%',marginBottom:'-2%'}}>{userName}</h3><br></br> 
                <center>
                    <div style={{color:'#fff',justifyContent:'center',height:'20px',width:'50%',display:'flex',}}>
                  
                    </div>
                    </center>
                    <Group direction="column" position="center" spacing="none">
  <Button component={Link} to="/profile" style={{height:'45px',paddingLeft:25,fontWeight:400,display:'flex',textAlign:'start',border:'none',width:'90%'}} leftIcon={<CgProfile style={{position:'absolute',width:20,height:20,left:3}}/>} rightIcon={<AiOutlineRight style={{height:'100%',width:'20',position:'absolute',right:0}}/>}  variant="default">Profile   </Button>
  <Button component={Link} to="/about" style={{height:'45px',paddingLeft:25,fontWeight:400,display:'flex',textAlign:'start',border:'none',width:'90%'}} leftIcon={<FcAbout style={{position:'absolute',color:'#fff',width:20,height:20,left:3}}/>}  rightIcon={<AiOutlineRight style={{height:'100%',width:'20',position:'absolute',right:0}}/>} variant="default">About    </Button>
  <Button component={Link} to="/history" style={{height:'45px',paddingLeft:25,fontWeight:400,display:'flex',textAlign:'start',border:'none',width:'90%',marginBottom:'1%'}} leftIcon={<AiOutlineHistory style={{position:'absolute',color:'#fff',width:20,height:20,left:3}}/>}  rightIcon={<AiOutlineRight style={{height:'100%',width:'20',position:'absolute',right:0}}/>} variant="default">History   </Button>
  <Button color={"red"} onClick={()=>{localStorage.removeItem("uid");}} style={{position:'absolute',bottom:30,width:'40%'}}>Logout</Button>
</Group>

                    
                </motion.div>:<motion.div ref={refe} animate={{height:'0px',opacity:0}}   transition={{duration:0.2}} style={{width:'250px',right:'10vw',marginRight:'-120px',position:'fixed',zIndex:3,background:'#303238',top:50}} ></motion.div>
        
        }
          {

                    }                
                   
                  
        {    
        isLogin?   
        <div style={{height:'100vh',opacity:1,display:'flex',alignItems:'center',justifyContent:'center',background:'#000'}}>
            <Loader/>
        </div>:<div>hi</div>
}
    </MantineProvider>
    </div>
}
</>
    )
}