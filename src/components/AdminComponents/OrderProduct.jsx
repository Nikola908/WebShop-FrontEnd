
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
    orderId: "",
    orderIdInitial: null,
    productId: "",
    quantity: 1
}

const OrderProduct = () => {
    const { orders, products, orderProducts, fetchDataOrderProducts } = useContext(ShopContext)
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState(defaultData)

    const handleOpen = () => {
        setOpenModal(true);
    };
    const handleClose = () => {
        setData(defaultData)
        setOpenModal(false);
    };


    const createClick = async (e) => {
        e.preventDefault();
        if (data.orderIdInitial !== null) updateClick(e)
        else {
            const bearerToken = localStorage.getItem('token');
            try {
                await fetch('https://localhost:44380/api/OrderProduct', {
                    method: 'POST',
                    body: JSON.stringify({
                        orderId: data.orderId, productId: data.productId, quantity: data.quantity
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearerToken}`
                    }
                }).then(() => {
                    toast.success("Successfully  Added Order/Product", {
                        className: 'success-toast',
                        draggable: true,
                        position: "top-center"
                    })
                    fetchDataOrderProducts()
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
    const fillEditClick = (order) => {
        setData(() => ({
            orderId: order.orderId, orderIdInitial: order.orderId, productId: order.productId, quantity: order.quantity
        }))
        handleOpen()

    }
    const updateClick = async (e) => {
        e.preventDefault();
        const bearerToken = localStorage.getItem('token');
        try {
            await fetch('https://localhost:44380/api/OrderProduct', {
                method: 'PUT',
                body: JSON.stringify({
                    orderId: data.orderId, productId: data.productId, quantity: data.quantity
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                }
            }).then(() => {
                fetchDataOrderProducts()
                toast.success("Successfully Edited Order/Product", {
                    className: 'succes-toast',
                    draggable: true,
                    position: "top-center"
                })
            })
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
            await fetch(`https://localhost:44380/api/OrderProduct/ByOrder/${ID}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                }
            }).then(() => {
                toast.success("Successfully Deleted Order!", {
                    className: 'success-toast',
                    draggable: true,
                    position: "top-center"
                })
                fetchDataOrderProducts()
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
                    {data.orderIdInitial === null ? <Typography component="h1" variant="h5">
                        Add Order Product
                    </Typography> : <Typography component="h1" variant="h5">
                        Edit Order Product
                    </Typography>}

                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        {data.orderIdInitial === null ? <>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl sx={{ marginBottom: 2 }} fullWidth>
                                    <InputLabel id="demo-simple-select-label">Order ID</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={data.orderId}
                                        label="Order ID"
                                        onChange={(e) => setData(o => ({ ...o, orderId: e.target.value }))}
                                    >{orders.map(o => {
                                        return <MenuItem key={o.orderId} value={o.orderId}>{o.orderId}</MenuItem>
                                    })}

                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Product Name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={data.productId}
                                        label="Product Name"
                                        onChange={(e) => setData(p => ({ ...p, productId: e.target.value }))}
                                    >{products.map(p => {
                                        return <MenuItem key={p.productId} value={p.productId}>{p.productName}</MenuItem>
                                    })}

                                    </Select>
                                </FormControl>
                            </Box>
                        </> : <>
                            <TextField onChange={(e) => setData(o => ({ ...o, orderId: e.target.value }))}
                                margin="normal"
                                disabled
                                fullWidth
                                value={data.orderId}
                                name="orderId"
                                label="Order ID"
                                type="orderId"
                                id="orderId"
                            />
                            <TextField onChange={(e) => setData(o => ({ ...o, productId: e.target.value }))}
                                margin="normal"
                                disabled
                                fullWidth
                                value={data.productId}
                                name="productId"
                                label="Product ID"
                                type="number"
                                id="productId"
                            />
                        </>}


                        <TextField onChange={(e) => setData(o => ({ ...o, quantity: e.target.value }))}
                            margin="normal"
                            required
                            fullWidth
                            value={data.quantity}
                            name="quantity"
                            label="Quantity"
                            type="number"
                            id="quantity"
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
                            <TableCell>Order ID</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell ><IconButton onClick={handleOpen}><AddIcon></AddIcon></IconButton></TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderProducts.map((o) => (
                            <TableRow key={o.orderId + "_" + o.productId}>
                                <TableCell component="th" scope="row"> {o.orderId} </TableCell>
                                <TableCell component="th" scope="row">{products.find(p => p.productId === o.productId).productName}</TableCell>
                                <TableCell component="th" scope="row">{o.quantity}</TableCell>
                                <TableCell><IconButton onClick={() => fillEditClick(o)} ><EditIcon></EditIcon></IconButton></TableCell>
                                <TableCell><IconButton onClick={() => deleteClick(o.orderId)}><DeleteIcon></DeleteIcon></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default OrderProduct