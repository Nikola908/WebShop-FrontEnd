
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

const defaultData = {
    userId: null,
    username: '',
    password: '',
    email: '',
    city: '',
    street: '',
    userRole: ''
}

const Users = () => {
    const { users, fetchDataUsers } = useContext(ShopContext)
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState(defaultData)
    const [error,setError] = useState(false)

    const handleEmail =()=>{
        var v =/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(data.email);
        if(v){
          setError(false)
          
          return;
        }
        setError(true)
    
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
        if(error===true){
            toast.error("Email is not formated right!", {
              className: 'error-toast',
              draggable: true,
              position: "top-center"
          })
          return;
          }
        if (data.userId !== null) updateClick(e)
        else {
            const bearerToken = localStorage.getItem('token');
            try {
                await fetch('https://localhost:44380/api/ShopUser', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: data.username,password:data.password, email: data.email,
                        city: data.city, street: data.street, userRole: data.userRole
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearerToken}`
                    }
                }).then(() => {
                    toast.success("Successfully  Added the User", {
                        className: 'success-toast',
                        draggable: true,
                        position: "top-center"
                    })
                    fetchDataUsers()
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
    const fillEditClick = (user) => {
        setData(() => ({
            userId: user.userId, username: user.username,password:user.password, email: user.email,
            city: user.city, street: user.street,
            userRole: user.userRole
        }))
        handleOpen()

    }
    const updateClick = async (e) => {
        e.preventDefault();
        if(error===true){
            toast.error("Email is not formated right!", {
              className: 'error-toast',
              draggable: true,
              position: "top-center"
          })
          return;
          }
        const bearerToken = localStorage.getItem('token');
        try {
            await fetch('https://localhost:44380/api/ShopUser', {
                method: 'PUT',
                body: JSON.stringify({
                    userId: data.userId, username: data.username,password:data.password, email: data.email,
                    city: data.city, street: data.street,
                    userRole: data.userRole
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                }
            }).then(() => {
                fetchDataUsers()
                toast.success("Successfully Edited the User", {
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
            await fetch(`https://localhost:44380/api/ShopUser/${ID}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                }
            }).then(() => {
                toast.success("Successfully Deleted User!", {
                    className: 'success-toast',
                    draggable: true,
                    position: "top-center"
                })
                fetchDataUsers()
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
                    {data.userId === null ? <Typography component="h1" variant="h5">
                        Add User
                    </Typography> : <Typography component="h1" variant="h5">
                        Edit User
                    </Typography>}

                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField onChange={(e) => setData(u => ({ ...u, username: e.target.value }))}
                            margin="normal"
                            required
                            fullWidth
                            value={data.username}
                            id="username"
                            label="Userame"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField onChange={(e) => setData(u => ({ ...u, password: e.target.value }))}
                            margin="normal"
                            required
                            fullWidth
                            value={data.password}
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="password"
                            autoFocus
                        />
                        <TextField onChange={(e) => setData(u => ({ ...u, email: e.target.value }))} error={error} onBlur={()=>handleEmail()}
                            margin="normal"
                            required
                            fullWidth
                            value={data.email}
                            name="email"
                            label="Email"
                            type="email"
                            id="email"
                        />
                        <TextField onChange={(e) => setData(u => ({ ...u, city: e.target.value }))}
                            margin="normal"
                            required
                            fullWidth
                            value={data.city}
                            name="city"
                            label="City"
                            type="city"
                            id="city"
                        />
                        <TextField onChange={(e) => setData(u => ({ ...u, street: e.target.value }))}
                            margin="normal"
                            required
                            fullWidth
                            value={data.street}
                            name="street"
                            label="Street"
                            type="street"
                            id="street"
                        />
                        <TextField onChange={(e) => setData(u => ({ ...u, userRole: e.target.value }))}
                            margin="normal"
                            required
                            fullWidth
                            value={data.price}
                            name="userRole"
                            label="Role"
                            type="userRole"
                            id="userRole"
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
                            <TableCell>Username</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell >City</TableCell>
                            <TableCell >Street</TableCell>
                            <TableCell >Role</TableCell>
                            <TableCell ><IconButton onClick={handleOpen}><AddIcon></AddIcon></IconButton></TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((u) => (
                            <TableRow key={u.userId}>
                                <TableCell component="th" scope="row"> {u.username} </TableCell>
                                <TableCell component="th" scope="row">{u.password}</TableCell>
                                <TableCell component="th" scope="row">{u.email}</TableCell>
                                <TableCell component="th" scope="row" >{u.city}</TableCell>
                                <TableCell component="th" scope="row" >{u.street}</TableCell>
                                <TableCell component="th" scope="row" >{u.userRole}</TableCell>
                                <TableCell><IconButton onClick={() => fillEditClick(u)} ><EditIcon></EditIcon></IconButton></TableCell>
                                <TableCell><IconButton onClick={() => deleteClick(u.userId)}><DeleteIcon></DeleteIcon></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Users