import React, { useContext, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import {  Button, Typography } from '@mui/material'
import Footer from './Footer';
import { ShopContext } from '../../ShopContext/ShopContext'
import AboutUsProduct from './AboutUsProduct';
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers';

const itemWidth = 300;
const AboutUsContainer = () => {
  const [scrollPosition,setScrollPosition] = useState(0)
  const containerRef = useRef()

  const handleScroll = (scrollAmount)=>{
    const newScrollPosition = scrollPosition+ scrollAmount

    setScrollPosition(newScrollPosition)

    containerRef.current.scrollLeft=newScrollPosition
  }
  
  const {products} = useContext(ShopContext)
  return (
    <Box >
      <Box  sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', width: '100%', height: '700px',
        backgroundImage: 'url(https://assets2.razerzone.com/images/pnx.assets/5650df732c97f6ce9e0c813fc57b9605/services-razer-id.jpg)'
      }}>
        <Typography maxWidth={{xs: '80%', md: '50%'}} sx={{fontSize:{ xs: '1.5rem', md: '2.8rem'}, marginTop:10 }} variant='h2' color="white" > Gaming Web Shop</Typography>
        <Typography maxWidth={{xs: '80%', md: '50%'}} sx={{ fontSize:{ xs: '1.2rem', md: '1.5rem'},wordBreak:'break-word', padding: 10}} variant='body2' color="white">
          Join over millions of users who enjoy using our Services to enrich their gaming experience.
          Explore our extensive collection of cutting-edge equipment 
          designed to elevate your gaming experience to new heights. From high-performance keyboards and 
          precision mice to immersive headsets and ergonomic chairs, gear up with the tools you need to dominate every 
          virtual battlefield. With expert advice and top-notch customer service, level up your setup and unleash your full 
          gaming potential today.
        </Typography>
      </Box>
      <Box sx={{ width:'100%',height:'auto',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',backgroundColor:'black'}}>
        <Typography padding={5} color='white' variant='h5'> Best Selling Products</Typography>
        <Box maxWidth='100%' sx={{margin:2,marginBottom:5,height:'auto',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',backgroundColor:'black'}}>
        <Button sx={{height:'400px',width:'10px' ,color:'#44d62c'}} onClick={()=>handleScroll(-itemWidth*2)}><ArrowLeftIcon/></Button>
        <Box ref={containerRef} sx={{width:'100%',overflowX:'hidden',scrollBehavior:'smooth'}}>
          <Box sx={{width:'100%',height:'100%',display:'flex',alignItems:'center',gap:'20px'}}>
          {products.map(p=>{
            return <AboutUsProduct product={p}></AboutUsProduct>
          })}
          </Box>
        </Box>
        <Button sx={{height:'400px' ,width:'1px', color:'#44d62c'}} onClick={()=>handleScroll(itemWidth*2)}><ArrowRightIcon /></Button>
        </Box>
      
        {/* <Box>
          <Button onClick={()=>handleScroll(-itemWidth*2)}><ArrowLeftIcon/></Button>
          <Button  onClick={()=>handleScroll(itemWidth*2)}><ArrowRightIcon/></Button>
        </Box> */}
      
      </Box>
      <Footer/> 
    </Box>


  )
}

export default AboutUsContainer