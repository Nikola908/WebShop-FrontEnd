import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:44380/api/Login', {
                method: 'POST',
                body: JSON.stringify({ username: username, password: password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();

            localStorage.setItem('token', result.token)
            localStorage.setItem('userName', jwtDecode(result.token)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
            localStorage.setItem('role', jwtDecode(result.token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
            localStorage.setItem('userId', jwtDecode(result.token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/primarysid"]);

            if (localStorage.getItem('role') === "admin") {
                navigate('/products')
            }
            else if(localStorage.getItem('role') === "user") navigate('/aboutUs')
        }
        catch (e) {
            if (e) {
                toast.error("Wrong Username or Password", {
                    className: 'error-toast',
                    draggable: true,
                    position: "top-center"
                })
            }
        }

    };

    return (
        <>
            <ToastContainer />
            <Grid container sx={{ height: '100vh' , width: '100vW'}}>
                <Grid item xs={false} sm={4} md={7} sx={{
                    backgroundImage: 'url(https://www.wallpapertip.com/wmimgs/80-805179_notebook-gamer-razer.png)',   
                     backgroundSize: 'cover',  backgroundPosition: 'center',
                }}
                />
                <Grid item xs={12} sm={8} md={5} >
                    <Box sx={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                        <Avatar sx={{ m: 1, bgcolor: '#2196f3' }}>
                            <SportsEsportsIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box sx={{  my: 8, mx: 4,display: 'flex',flexDirection: 'column',alignItems: 'center',}}
                        >
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField onChange={(e) => setUsername(e.target.value)} margin="normal" required fullWidth hid="username"
                                    label="User Name" name="username" autoComplete="username" autoFocus
                                />
                                <TextField onChange={(e) => setPassword(e.target.value)} margin="normal" required fullWidth
                                    name="password" label="Password" type="password" id="password" autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Link href="http://localhost:3000/signUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

            </Grid>
        </>
    )
}

export default LoginForm