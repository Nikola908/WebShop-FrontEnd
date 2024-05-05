import React, { useState, useContext } from 'react'
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
    categoryId: null,
    categoryName: '',
    categoryDescription: ''
}
const Categories = () => {
    const { categories, fetchDataCategories } = useContext(ShopContext)
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
        if (data.categoryId !== null) updateClick(e)
        else {
            const bearerToken = localStorage.getItem('token');
            try {
                await fetch('https://localhost:44380/api/Category', {
                    method: 'POST',
                    body: JSON.stringify({
                        categoryName: data.categoryName, categoryDescription: data.categoryDescription
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearerToken}`
                    }
                }).then(() => {
                    toast.success("Successfully  Added the Category", {
                        className: 'success-toast',
                        draggable: true,
                        position: "top-center"
                    })
                    fetchDataCategories()
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
            categoryId: product.categoryId, categoryName: product.categoryName, categoryDescription: product.categoryDescription
        }))
        handleOpen()

    }
    const updateClick = async (e) => {
        e.preventDefault();
        const bearerToken = localStorage.getItem('token');
        try {
            await fetch('https://localhost:44380/api/Category', {
                method: 'PUT',
                body: JSON.stringify({
                    categoryId: data.categoryId, categoryName: data.categoryName, categoryDescription: data.categoryDescription
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                }
            }).then(() => {
                fetchDataCategories()
                toast.success("Successfully Edited the Category", {
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
            await fetch(`https://localhost:44380/api/Category/${ID}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                }
            }).then(() => {
                toast.success("Successfully Deleted Category!", {
                    className: 'success-toast',
                    draggable: true,
                    position: "top-center"
                })
                fetchDataCategories()
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
                    {data.categoryId === null ? <Typography component="h1" variant="h5">
                        Add Category
                    </Typography> : <Typography component="h1" variant="h5">
                        Edit Category
                    </Typography>}

                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField onChange={(e) => setData(c => ({ ...c, categoryName: e.target.value }))}
                            margin="normal"
                            required
                            fullWidth
                            value={data.categoryName}
                            id="categoryName"
                            label="Category Name"
                            name="categoryName"
                            autoComplete="categoryName"
                            autoFocus
                        />
                        <TextField onChange={(e) => setData(c => ({ ...c, categoryDescription: e.target.value }))}
                            margin="normal"
                            required
                            fullWidth
                            value={data.categoryDescription}
                            name="description"
                            label="Description"
                            type="description"
                            id="description"
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
                            <TableCell>Category Name</TableCell>
                            <TableCell>Category Description</TableCell>
                            <TableCell ><IconButton onClick={handleOpen}><AddIcon></AddIcon></IconButton></TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((c) => (
                            <TableRow key={c.categoryId}>
                                <TableCell component="th" scope="row"> {c.categoryName} </TableCell>
                                <TableCell component="th" scope="row">{c.categoryDescription}</TableCell>
                                <TableCell><IconButton onClick={() => fillEditClick(c)} ><EditIcon></EditIcon></IconButton></TableCell>
                                <TableCell><IconButton onClick={() => deleteClick(c.categoryId)}><DeleteIcon></DeleteIcon></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Categories