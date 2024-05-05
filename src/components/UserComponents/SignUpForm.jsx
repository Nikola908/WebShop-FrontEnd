import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const defaultData = {
  username: '',
  password:'',
  email: '',
  city: '',
  street: ''
}


const SignUpForm = () => {
  const [data, setData] = useState(defaultData)
  const [error,setError] =useState({
    username: false,
    email: false,
    password: false
  })
  const navigate = useNavigate();

  console.log(error)
  const handleUsername =()=>{
    if(!data.username || data.username.length<5){
      setError(prev=>({...prev, username : true})
      )
      return;
    }
    setError(prev=>({...prev, username : false})
  )
  }
  const handleEmail =()=>{
    var v =/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(data.email);
    if(v){
      setError(prev=>({...prev, email : false})
      )
      return;
    }
    setError(prev=>({...prev, email : true})
  )
  }
  const handlePassword =()=>{
    if(!data.password || data.email.password<5){
      setError(prev=>({...prev, password : true})
      )
      return;
    }
    setError(prev=>({...prev, password : false})
  )
  }

  const Login = async () => {

    const response = await fetch('https://localhost:44380/api/Login', {
      method: 'POST',
      body: JSON.stringify({ username: data.username, password: data.password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();

    localStorage.setItem('token', result.token)
    localStorage.setItem('userName', jwtDecode(result.token)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
    localStorage.setItem('role', jwtDecode(result.token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
    localStorage.setItem('userId', jwtDecode(result.token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/primarysid"]);

     if(localStorage.getItem('role') === "user") navigate('/aboutUs')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(error.username===true){
      toast.error("Username is less than 5 characters", {
        className: 'error-toast',
        draggable: true,
        position: "top-center"
    })
    return;
    }else if(error.email===true){
      toast.error("Email not formated properly", {
        className: 'error-toast',
        draggable: true,
        position: "top-center"
    })
    return;
    }else if (error.password===true){
      toast.error("Password is less than 5 characters", {
        className: 'error-toast',
        draggable: true,
        position: "top-center"
    })
    return;
    }

    const bearerToken = localStorage.getItem('token')
    await fetch('https://localhost:44380/api/ShopUser', {
      method: 'POST',
      body: JSON.stringify({
        username: data.username, password: data.password, email: data.email, city: data.city, street: data.street, userRole: "user"
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`
      }
    }).then(() => {
      Login()
    }
    )
  };
  return (
    <Container maxWidth="xs">
      <ToastContainer/>
      <Box
        sx={{
          marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#2196f3' }}>
          <CurrencyBitcoinIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField onChange={(e) => setData(u => ({ ...u, username: e.target.value }))} error={error.username} autoComplete="given-name" name="userName" required
              onBlur={handleUsername}  fullWidth id="userName" label="UserName" autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={(e) => setData(u => ({ ...u, email: e.target.value }))}error={error.email} required fullWidth id="email"
              onBlur={handleEmail}   label="Email Address" name="email" autoComplete="email" type='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={(e) => setData(u => ({ ...u, password: e.target.value }))} error={error.password} required fullWidth
               onBlur={handlePassword}  name="password" label="Password" type="password" id="password" autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={(e) => setData(u => ({ ...u, city: e.target.value }))}
                required fullWidth name="city" label="City" type="string" id="city" autoComplete="city"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={(e) => setData(u => ({ ...u, street: e.target.value }))}
                required fullWidth name="adress" label="Adress" type="string" id="adress" autoComplete="Adress"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Link href="http://localhost:3000/signIn" variant="body2">
            Already have an account? Sign in
          </Link>
        </Box>
      </Box>

    </Container>


  )
}

export default SignUpForm