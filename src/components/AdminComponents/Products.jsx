
import React, { useContext, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ShopContext } from '../../ShopContext/ShopContext';
import { IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'

const defaultData = {
  productId: null,
  productName: '',
  productDescription: '',
  quantity: 0,
  categoryId: 1,
  categoryName: '',
  price: 0,
  productImage: ''
}


const Products = () => {
  const { products, categories, fetchDataProduct } = useContext(ShopContext)
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(defaultData)



  const categoryName = (ID)=>{
  return categories.find(c=> c.categoryId===ID).categoryName
  }


  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setData(defaultData)
    setOpenModal(false);
  };

  const createClick = async (e) => {
    e.preventDefault();
    if (data.productId !== null) updateClick(e)
    else {
      const bearerToken = localStorage.getItem('token');
      try {
        await fetch('https://localhost:44380/api/Product', {
          method: 'POST',
          body: JSON.stringify({
            productName: data.productName, productDescription: data.productDescription,
            quantity: data.quantity, price: data.price, categoryId: data.categoryId, productImage: data.productImage, category: null
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
          }
        }).then(() => {
          toast.success("Successfully  Added the Product", {
            className: 'success-toast',
            draggable: true,
            position: "top-center"
          })
          fetchDataProduct()
        }
        );

      }
      catch (e) {
        toast.error("Error! Wrong input!", {
          className: 'error-toast',
          draggable: true,
          position: "top-center"
        })
      }
    }
  };
  const fillEditClick = (product) => {
    setData(() => ({
      productId: product.productId, productName: product.productName, productDescription: product.productDescription,
      quantity: product.quantity, categoryId: product.categoryId,
      price: product.price,
      productImage: product.productImage
    }))
    handleOpen()

  }
  const updateClick = async (e) => {
    e.preventDefault();
    const bearerToken = localStorage.getItem('token');
    try {
      await fetch('https://localhost:44380/api/Product', {
        method: 'PUT',
        body: JSON.stringify({
          productId: data.productId, productName: data.productName, productDescription: data.productDescription,
          quantity: data.quantity, price: data.price, categoryId: data.categoryId, productImage: data.productImage, category: null
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`
        }
      }).then(() => {
        fetchDataProduct()
        toast.success("Successfully Edited the Product", {
          className: 'succes-toast',
          draggable: true,
          position: "top-center"
        })
      }

      )


    }
    catch (e) {
      toast.error("Error! Wrong input!", {
        className: 'error-toast',
        draggable: true,
        position: "top-center"
      })
    }
  };
  const deleteClick = async (ID) => {
    const bearerToken = localStorage.getItem('token');
    if (window.confirm('Are you sure?')) {
      await fetch(`https://localhost:44380/api/Product/${ID}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`
        }
      }).then(() => {
        toast.success("Successfully Deleted Product!", {
          className: 'success-toast',
          draggable: true,
          position: "top-center"
        })
        fetchDataProduct()
      })
    }

  };
  return (
    <>
      <ToastContainer />
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, pt: 2, px: 4, pb: 3, }}>
          {data.productId === null ? <Typography component="h1" variant="h5">
            Add Product
          </Typography> : <Typography component="h1" variant="h5">
            Edit Product
          </Typography>}

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField onChange={(e) => setData(p => ({ ...p, productName: e.target.value }))}
              margin="normal"
              required
              fullWidth
              value={data.productName}
              id="productName"
              label="Product Name"
              type="string"
              name="productName"
              autoComplete="productName"
              autoFocus
            />
            <TextField onChange={(e) => setData(p => ({ ...p, productDescription: e.target.value }))}
              margin="normal"
              required
              fullWidth
              value={data.productDescription}
              name="description"
              label="Description"
              type="string"
              id="description"
            />
            <TextField onChange={(e) => setData(p => ({ ...p, quantity: e.target.value }))} 
              margin="normal"
              required
              fullWidth
              value={data.quantity}
              name="quantity"
              label="Quantity"
              type="number"
              id="quantity"
            />
            <Box sx={{ minWidth: 120,marginTop:1}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data.categoryId}
                  label="Category"
                  onChange={(e) => setData(p => ({ ...p, categoryId: e.target.value }))}
                >{categories.map(c => {
                  return <MenuItem key={c.categoryId} value={c.categoryId}>{c.categoryName}</MenuItem>
                })}

                </Select>
              </FormControl>
            </Box>
            <TextField onChange={(e) => setData(p => ({ ...p, price: e.target.value }))} 
              margin="normal"
              required
              fullWidth
              value={data.price}
              name="price"
              label="Price"
              type="price"
              id="price"
            />
            <TextField onChange={(e) => setData(p => ({ ...p, productImage: e.target.value }))}
              margin="normal"
              required
              fullWidth
              value={data.productImage}
              name="image"
              label="Image Url"
              type="string"
              id="image"
            />
            <Button
              onClick={(e) => createClick(e)}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Product Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell >Price in $</TableCell>
              <TableCell >Product Quantity</TableCell>
              <TableCell >Category Name</TableCell>
              <TableCell >Product Description</TableCell>
              <TableCell ><IconButton onClick={handleOpen}><AddIcon></AddIcon></IconButton></TableCell>
              <TableCell ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.productId}>
                <TableCell component="th" scope="row"> <img alt='' style={{ width: 100, height: 100 }} src={p.productImage} /> </TableCell>
                <TableCell component="th" scope="row"> {p.productName} </TableCell>
                <TableCell component="th" scope="row">{p.price}$</TableCell>
                <TableCell component="th" scope="row" >{p.quantity}</TableCell>
                <TableCell component="th" scope="row" >
                  {categoryName(p.categoryId)}
                </TableCell>
                <TableCell component="th" scope="row" >{p.productDescription}</TableCell>
                <TableCell><IconButton onClick={() => fillEditClick(p)} ><EditIcon></EditIcon></IconButton></TableCell>
                <TableCell><IconButton onClick={() => deleteClick(p.productId)}><DeleteIcon></DeleteIcon></IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Products