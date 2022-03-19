import React from 'react'
import { Button, Card ,MantineProvider} from '@mantine/core'
import { Link } from 'react-router-dom'
export const Err404 = () => {
  return (
      <MantineProvider theme={{colorScheme:'dark'}}>
    <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#10171E'}}>
     <div style={{width:'50%',height:'50%',background:"#1A1B1E"}}>
        <center><h1 style={{paddingTop:'15px',color:"#ddd"}}>404 Page Not Found</h1></center>
        <center><Button component={Link} to="/home" color={"teal"} style={{marginTop:'7%'}}>Home</Button></center>
     </div>
    </div>
    </MantineProvider>
  )
}
