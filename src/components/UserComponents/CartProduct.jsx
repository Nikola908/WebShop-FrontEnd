import React, { useContext } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import './Components.css'
import { Box, Button } from '@mui/material'
import { ShopContext } from '../../ShopContext/ShopContext'


const CartProduct = ({ product }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(ShopContext)
  return (
    <>
      <Paper sx={{display:'flex',flexDirection:'row'}} elevation={5} >
        <img alt='' style={{ width: 300, height: 300 ,backgroundColor:'black'}} src={product.productImage} />
        <Box sx={{width:'100%', backgroundColor:'#212121', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Typography sx={{ margin: 0.5, padding: 1 }} variant='h6' color="white" >{product.productName}</Typography>
          <Typography sx={{ margin: 0.5, padding: 1 }} color="#999">{product.productDescription}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Typography  color="white">{product.price}$</Typography>
            <Box sx={{  display: 'flex', alignItems: 'center', flexDirection: 'row', border: 2, borderColor:'black',
             borderRadius: 10, borderStyle: 'solid', margin: 1.5
            }} >
              <Button sx={{color:'#44d62c'}} onClick={() => { addToCart(product.productId) }}  >+</Button>
              <Typography sx={{color:'#44d62c'}}>{cartItems[product.productId]}</Typography>
              <Button sx={{color:'#44d62c'}} onClick={() => { removeFromCart(product.productId) }}  >-</Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  )
}

export default CartProduct