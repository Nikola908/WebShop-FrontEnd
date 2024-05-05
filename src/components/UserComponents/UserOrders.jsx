
import React, { useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ShopContext } from '../../ShopContext/ShopContext';
import {  IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import Footer from './Footer';


const UserOrders = () => {
    const { orders, users, fetchDataOrders, orderProducts, products } = useContext(ShopContext)

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
            <TableContainer component={Paper}>
                <Table  sx={{backgroundColor:"#212121" , minWidth: 700 }} aria-label="customized table">
                    <TableHead >
                        <TableRow >
                            <TableCell ><Typography color='#999' fontWeight={700} variant='h5'>Order ID</Typography></TableCell>
                            <TableCell ><Typography color='#999' fontWeight={700} variant='h5'>Order Date</Typography></TableCell>
                            <TableCell ><Typography color='#999' fontWeight={700} variant='h5'>Order Status</Typography></TableCell>
                            <TableCell ><Typography color='#999' fontWeight={700}  variant='h5'>User Name</Typography></TableCell>
                            <TableCell ><Typography color='#999' fontWeight={700} variant='h5'>Products</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody  sx={{borderColor:'green'}}>
                        {orders.filter(u => u.userId === parseInt(localStorage.getItem('userId'))).map((o) => (
                            <TableRow key={o.orderId} >
                                <TableCell  component="th" scope="row"><Typography sx={{color:'#999'}}>{o.orderId}</Typography></TableCell>
                                <TableCell  component="th" scope="row"><Typography sx={{color:'#999'}}>{o.orderDate}</Typography>  </TableCell>
                                <TableCell  component="th" scope="row"><Typography sx={{color:'#999'}}>{o.orderStatus}</Typography></TableCell>
                                <TableCell  component="th" scope="row"><Typography sx={{color:'#999'}}>{users.find(uu => uu.userId === o.userId).username}</Typography></TableCell>
                                <TableCell>
                                    <Table aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                            <TableCell sx={{borderColor:'#44d62c'}}></TableCell>
                                                <TableCell sx={{borderColor:'#44d62c'}}><Typography color='#999' sx={{fontWeight:600}} variant='h6'>Product</Typography></TableCell>
                                                <TableCell sx={{borderColor:'#44d62c'}}><Typography color='#999'  sx={{fontWeight:600}} variant='h6'>Quantity</Typography></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orderProducts.filter(op => op.orderId === o.orderId).map(opp => {
                                                return <TableRow key={opp.orderId+"_"+opp.productId}>
                                                     <TableCell sx={{borderColor:'#44d62c'}}><img  alt='' style={{width:'50px',height:'50px'}}src={products.find(p => p.productId === opp.productId).productImage}/></TableCell>
                                                    <TableCell sx={{color:'#999',borderColor:'#44d62c'}}><Typography>{products.find(p => p.productId === opp.productId).productName}</Typography></TableCell>
                                                    <TableCell sx={{color:'#999',borderColor:'#44d62c'}}><Typography>{opp.quantity}</Typography></TableCell>
                                                </TableRow>
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableCell>
                                <TableCell><IconButton sx={{color:'#44d62c'}} onClick={() => deleteClick(o.orderId)}><DeleteIcon></DeleteIcon></IconButton></TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Footer></Footer>
        </>
    )
}

export default UserOrders