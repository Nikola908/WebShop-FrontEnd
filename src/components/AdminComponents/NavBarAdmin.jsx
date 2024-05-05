import React from 'react'
import { AppBar, IconButton, Typography, Box, Button } from '@mui/material'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';

const NavBarAdmin = () => {
    const logout = ()=>{
        localStorage.clear();
    }
    return (
        <AppBar style={{ position: 'sticky', top: 0 }} >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton sx={{ display: { xs: 'none', md: 'flex' } }} size='large' color='inherit'>
                            <CurrencyBitcoinIcon></CurrencyBitcoinIcon>
                    </IconButton>
                    <Typography variant='h6'>GAMING SHOP</Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>  
                    <Button color='inherit'><Link style={{ textDecoration: 'none', color: 'white' }} to={'/products'}>Products </Link></Button>
                    <Button color='inherit'><Link style={{ textDecoration: 'none', color: 'white' }} to={'/categories'}>Categories </Link></Button>
                    <Button color='inherit'><Link style={{ textDecoration: 'none', color: 'white' }} to={'/users'}>Users </Link></Button>
                    <Button color='inherit'><Link style={{ textDecoration: 'none', color: 'white' }} to={'/orders'}>Orders </Link></Button>
                    <Button color='inherit'><Link style={{ textDecoration: 'none', color: 'white' }} to={'/orderProducts'}>Order/Product </Link></Button>
                </Box>
                <Button onClick={logout} color='inherit'><Link style={{ textDecoration: 'none', color: 'white' }} to={'/signIn'}>Log out </Link></Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBarAdmin