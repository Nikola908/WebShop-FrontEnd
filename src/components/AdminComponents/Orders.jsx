
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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-toastify/dist/ReactToastify.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'

const defaultData = {
    orderId: null,
    orderDate: Date.now(),
    orderStatus: '',
    userId: 0,
    username: ''
}

const Orders = () => {
    const { orders,users, fetchDataOrders } = useContext(ShopContext)
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
        if (data.orderId !== null) updateClick(e)
        else {
            const bearerToken = localStorage.getItem('token');
            try {
                await fetch('https://localhost:44380/api/ShopOrder', {
                    method: 'POST',
                    body: JSON.stringify({
                        orderDate: data.orderDate, orderStatus: data.orderStatus, userId: data.userId,user:null
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
                    fetchDataOrders()
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
            orderId: order.orderId, orderDate: order.orderDate, orderStatus: order.orderStatus, userId: order.userId
        }))
        handleOpen()

    }
    const updateClick = async (e) => {
        e.preventDefault();
        const bearerToken = localStorage.getItem('token');
        try {
            await fetch('https://localhost:44380/api/ShopOrder', {
                method: 'PUT',
                body: JSON.stringify({
                    orderId: data.orderId, orderDate: data.orderDate, orderStatus: data.orderStatus, userId: data.userId,user:null
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                }
            }).then(() => {
                fetchDataOrders()
                toast.success("Successfully Edited the Order", {
                    className: 'succes-toast',
                    draggable: true,
                    position: "top-center"
                })
            })
        }
        catch (error) {
            console.log(error)
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
            await fetch(`https://localhost:44380/api/ShopOrder/${ID}`, {
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
                fetchDataOrders()
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
                    {data.orderId === null ? <Typography component="h1" variant="h5">
                        Add Order
                    </Typography> : <Typography component="h1" variant="h5">
                        Edit Order
                    </Typography>}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker   onChange={(e) => setData(o => ({ ...o, orderDate: e.format('YYYY-MM-DD') }))} label="Date" />
                            </DemoContainer>
                        </LocalizationProvider>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                       
                        <TextField onChange={(e) => setData(o => ({ ...o, orderStatus: e.target.value }))}
                            margin="normal"
                            required
                            fullWidth
                            value={data.orderStatus}
                            id="status"
                            label="Order Status"
                            name="status"
                            autoComplete="status"
                            autoFocus
                        />

              <FormControl sx={{marginTop:2}} fullWidth>
                <InputLabel id="demo-simple-select-label">User Name</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data.userId}
                  label="Username"
                  onChange={(e) => setData(o => ({ ...o, userId: e.target.value }))}
                >{users.map(u => {
                  return <MenuItem key={u.userId} value={u.userId}>{u.username}</MenuItem>
                })}

                </Select>
              </FormControl>
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
                            <TableCell>Order Date</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell ><IconButton onClick={handleOpen}><AddIcon></AddIcon></IconButton></TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((o) => (
                            <TableRow key={o.orderId}>
                                <TableCell component="th" scope="row"> {o.orderDate} </TableCell>
                                <TableCell component="th" scope="row">{o.orderStatus}</TableCell>
                                <TableCell component="th" scope="row">{users.find(u=> u.userId===o.userId).username}</TableCell>
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

export default Orders