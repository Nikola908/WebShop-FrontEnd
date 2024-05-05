import React from 'react'
import Box from '@mui/material/Box'
import { Button, IconButton, Typography } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <>
    <Box sx={{ borderBottom: '2px solid', borderColor: 'white', backgroundColor: '#212121', display: 'flex',
    justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
      <Typography variant='h6' sx={{ color: 'white', padding: 2 }}>Get Connected with us on social networks</Typography>
      <Box sx={{ padding: 2, marginRight:5}}>
        <IconButton href='https://www.instagram.com/' sx={{ color: 'white', padding: 2 }}><InstagramIcon /></IconButton>
        <IconButton href='https://www.facebook.com/' sx={{ color: 'white', padding: 2 }}><FacebookIcon /></IconButton>
        <IconButton href='https://www.linkedin.com/' sx={{ color: 'white', padding: 2 }}><LinkedInIcon /></IconButton>
        <IconButton href='https://twitter.com/' sx={{ color: 'white', padding: 2 }}><XIcon /></IconButton>
        <IconButton href='https://github.com/' sx={{ color: 'white', padding: 2 }}><GitHubIcon /></IconButton>
      </Box>
    </Box>
  </Box>
  <Box sx={{
    backgroundColor: '#212121', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'
  }}>
    <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center ', flexDirection: 'column' }}>
      <Typography variant='h6' sx={{ color: 'white', padding: 2 }} >Gaming Web Shop</Typography>
      <Typography sx={{ wordBreak: 'break-word', wordWrap: 'break-word', color: '#999', padding: 2 }} >Discover your gaming potential ! Explore our diverse collection, 
      meticulously curated to cater to gamers of every level and preference.With fast shipping, competitive prices, and expert support, we are your trusted ally on your quest for gaming greatness.</Typography>
    </Box>
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center ', flexDirection: 'column', height: '100%' }} >
      <Typography variant='h6' sx={{ color: 'white', padding: 2 }} >Links</Typography>
      <Button sx={{ '&:hover': { color: '#44d62c',   textDecoration: 'underline', transform:'scale(1.1,1.1)' }}} color='inherit'><Link style={{ padding: 3, textDecoration: 'none', color: '#999' }} to={'/aboutUs'}>About Us </Link></Button>
      <Button sx={{ '&:hover': { color: '#44d62c',   textDecoration: 'underline', transform:'scale(1.1,1.1)' }}} color='inherit'><Link style={{ padding: 3, textDecoration: 'none', color: '#999' }} to={'/shop'}>Shop </Link></Button>
      <Button  sx={{ '&:hover': { color: '#44d62c',   textDecoration: 'underline', transform:'scale(1.1,1.1)' }}} color='inherit'><Link style={{ padding: 3, textDecoration: 'none', color: '#999' }} to={'/myOrders'}>My Orders </Link></Button>
    </Box>
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }}>
      <Typography variant='h6' sx={{ color: 'white', padding: 2 }} >Contact</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <IconButton sx={{ color: 'white', padding: 2 }}><HomeIcon /></IconButton>
        <Typography sx={{ color: '#999' }}>Narodnog Fronta 100 , Novi Sad</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <IconButton sx={{ color: 'white', padding: 2 }}><EmailIcon /></IconButton>
        <Typography sx={{ color: '#999' }}>GamingWebShop@gmail.com</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <IconButton sx={{ color: 'white', padding: 2 }}><PhoneIcon /></IconButton>
        <Typography sx={{ color: '#999' }}>+381 123/123/123      </Typography>
      </Box>
    </Box>
    </Box>
    </>
  )
}

export default Footer