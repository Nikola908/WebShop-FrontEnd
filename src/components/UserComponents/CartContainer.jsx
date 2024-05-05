import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../ShopContext/ShopContext'
import CartProduct from './CartProduct'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
const CartContainer = () => {
  const { cartItems, products, fetchDataOrders, fetchDataOrderProducts, clearCartItems } = useContext(ShopContext)
  const [productsQuantity, setProductsQuantity] = useState([])
  const [totalMoney,setTotalMoney] = useState(0)


  useEffect(() => {
    setProductsQuantity([])
    setTotalMoney(0)
    for (let i = 0; i < products.length; i++) {
      if (cartItems[products[i].productId] > 0) {
        setProductsQuantity(prev => [...prev, { productId: products[i].productId, quantity: cartItems[products[i].productId] }])
        setTotalMoney(prev=> prev + products[i].price*cartItems[products[i].productId])
      }
    }
  }, [cartItems, products]);

  const createOrderProducts = async () => {
    const bearerToken = localStorage.getItem('token');
    await fetch(' https://localhost:44380/ProductOrder', {
      method: 'POST',
      body: JSON.stringify({
        order: {
          orderDate: new Date().toISOString().slice(0, 10),
          orderStatus: "In Process",
          userId: parseInt(localStorage.getItem('userId'))
        },
        products: productsQuantity
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`
      }
    }).then(() => {
      toast.success("Successfully  Added the Order", {
        className: 'success-toast',
        draggable: true,
        position: "top-center"
      })
    }).then(() => {
      fetchDataOrders()
      fetchDataOrderProducts()
      setProductsQuantity([])
      clearCartItems()
    })
  }

  return (
    <>
      <ToastContainer />
      <Box sx={{backgroundColor:'#585555',minHeight:'100vh',borderTop:'10px solid',borderColor:'#585555'}} >
      <Container >
        <Grid marginTop={0.5} container spacing={2}>
          {products.map(p => {
            if (cartItems[p.productId] > 0) {
              return <Grid key={p.productId} item xs={12} sm={6} md={6} >
               <CartProduct key={p.productId} product={p}></CartProduct>
            </Grid>
            }
            else return null
          })}
        </Grid>
        {totalMoney !== 0 ?
          <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography  margin={1}>
              Total cart price : {totalMoney}$</Typography>
            <Button  sx={{backgroundColor:'#44d62c',color:'black'}} onClick={() => createOrderProducts()} variant='contained'> Go To Checkout</Button>
          </Box>:
          <Box sx={{ margin:'25%', padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'column' }}>
            <Typography  textAlign='center'>NO ITEMS IN CART! </Typography>
           <Link to={'/shop'}><Button  sx={{backgroundColor:'#44d62c',color:'black',margin:2}} variant='contained'> Go back to shop</Button></Link> 
          </Box>}
      </Container>
      </Box>
      <Footer></Footer>
    </>

  )
}

export default CartContainer