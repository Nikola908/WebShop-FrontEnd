import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import './Components.css'
import { Button, Box } from '@mui/material'
import { Link } from 'react-router-dom';


const AboutUsProduct = ({ product }) => {
  return (
    <Paper elevation={5}>
      <img alt='' style={{ backgroundColor: 'black', width: '300px', height: '300px' }} src={product.productImage} />
      <Box sx={{ backgroundColor: '#212121', width: '100%', height: '210px', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', alignItems: 'center'  }}>
        <Typography sx={{ padding: 0.5, paddingTop: 1 }} variant='h5' color="white" >{product.productName}</Typography>
        <Typography sx={{ padding: 0.5 }} color="#999">{product.productDescription}</Typography>
        <Typography sx={{ padding: 0.5 }} color="#999">In Stock : {product.quantity}</Typography>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ padding: 3 }} color="white">{product.price}$</Typography>
          <Button sx={{ margin: 3, backgroundColor: '#44d62c', color: 'black' }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to={'/shop'}>
            <Typography variant='body2' >Shop Now</Typography></Link></Button>
        </Box>

      </Box>
    </Paper>
  )
}

export default AboutUsProduct