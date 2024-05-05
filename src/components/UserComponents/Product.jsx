import React, { useContext } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import './Components.css'
import { Button, Box } from '@mui/material'
import { ShopContext } from '../../ShopContext/ShopContext'
import { red } from '@mui/material/colors';



const Product = ({ product }) => {
  const { addToCart } = useContext(ShopContext)
  return (
    // background slike => zapravo vise background boxa ispod'#212121' -> trenutni background slike #222
    <>
      <Paper className='productPaper' elevation={5}>
        <img className='productImage' alt='' style={{backgroundColor:'black', width: '100%', height: '100%' }} src={product.productImage} />
        <Box sx={{backgroundColor:'#212121' ,width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ padding: 0.5, paddingTop: 1 }} variant='h5' color="white" >{product.productName}</Typography>
          <Typography sx={{ padding: 0.5 }} color="#999">{product.productDescription}</Typography>
          <Typography sx={{ padding: 0.5 }} color="#999">In Stock : {product.quantity}</Typography>
          <Box sx={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ padding:3 }}color="white">{product.price}$</Typography>
            {product.quantity > 0 ? <Button sx={{ margin: 3 ,backgroundColor:'#44d62c',color:'black'}}
              onClick={() => addToCart(product.productId)}
              variant='contained'>Add</Button> : <Button disabled sx={{ margin: 3, color: red }}
                onClick={() => addToCart(product.productId)}
                variant='contained'>Add</Button>}
          </Box>
        </Box>
      </Paper>

    </>
  )
}

export default Product