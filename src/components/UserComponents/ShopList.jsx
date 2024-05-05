
import React, { useContext, useState } from "react";
import Product from "./Product";
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { ShopContext } from '../../ShopContext/ShopContext'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Footer from "./Footer";



const ShopList = () => {
  const { products, categories } = useContext(ShopContext)
  const [filterProducts, setFilterProducts] = useState(products)

  const filteredProducts = (id) => {
    setFilterProducts(() => {
      return products.filter(p => p.categoryId === id)
    })
  }
  const filterByName = (name) => {
    if (filterProducts !== undefined) {
      setFilterProducts(() => {
        return products.filter(p => p.productName.toLowerCase().includes(name.toLowerCase()))
      })
    }
  }

  return (
    <>
    <Box  sx={{ minHeight: '100vh'}} style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOM5smeywnYbTw3Xx7WePfnmBfoAZ7RSqJog&s)' }}>
      <Box className="categoriesNav" >
        <Box sx={{ margin:1, bgcolor: "#999", display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
          <SearchIcon sx={{ color: '#222', padding: 0.5 }} />
          <InputBase  sx={{color:'#222'}}
            onChange={(e) => filterByName(e.target.value)}
            placeholder="Search…"></InputBase>

        </Box>
        <Button sx={{color:'#999'}}  style={{ margin: 4 }} onClick={() => setFilterProducts(products)}>All</Button>
        {categories.map(c => {
          return <Button sx={{color:'#999'}} key={c.categoryId} onClick={() => filteredProducts(c.categoryId)} style={{ margin: 4 }}
            color='inherit'>{c.categoryName} </Button>
        })}
      </Box>
      <Container >
        <Grid marginTop={0.5} container spacing={2}>
          {filterProducts.length !== 0 ? filterProducts.map(p => {
            return <Grid key={p.productId} item xs={12} sm={6} md={3} >
              <Product product={p}></Product>
            </Grid>
          }) : <Grid sx={{ display: "flex", justifyContent: 'center' }} item xs={12} sm={12} md={12} >
            <Typography > NO AVAILABLE ITEMS!</Typography>
          </Grid>}
        </Grid>
      </Container>
    </Box>
    <Footer></Footer>
    </>

  )

}

export default ShopList