import React, { useContext } from 'react'
import { AppBar, IconButton, Typography, Box, Button, Badge } from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { ShopContext } from '../../ShopContext/ShopContext'
export const Navbar = () => {
    const { cartCount, clearCartItems } = useContext(ShopContext)
    const logout = () => {
        clearCartItems();
        localStorage.clear();
    }
    return (
        <AppBar style={{ borderBottom: '2px solid', borderColor: '#44d62c', backgroundColor: 'black', position: 'sticky', top: 0 }} >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton sx={{ paddingBottom: 1, display: { xs: 'none', md: 'flex' } }} size='large' color='inherit'>
                        <Link to={'/aboutUs'} style={{ textDecoration: 'none', color: 'white' }} >
                            <SportsEsportsIcon sx={{ '&:hover': { color: '#44d62c', textDecoration: 'underline', transform: 'scale(1.1,1.1)' } }} />
                        </Link>
                    </IconButton>
                    <Typography variant='h6'>GAMING SHOP</Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Button sx={{ '&:hover': { color: '#44d62c', textDecoration: 'underline', transform: 'scale(1.1,1.1)' } }} color='inherit'><Link style={{ textDecoration: 'none', color: 'white' }} to={'/aboutUs'}><Typography variant='h6'>About Us</Typography></Link></Button>
                    <Button sx={{ '&:hover': { color: '#44d62c', textDecoration: 'underline', transform: 'scale(1.1,1.1)' } }} color='inherit'><Link style={{ textDecoration: 'none', color: 'white' }} to={'/shop'}><Typography variant='h6'>Shop</Typography></Link></Button>
                    <Button sx={{ '&:hover': { color: '#44d62c', textDecoration: 'underline', transform: 'scale(1.1,1.1)' } }} color='inherit'><Link style={{ textDecoration: 'none', color: 'white' }} to={'/myOrders'}><Typography variant='h6'>My Orders</Typography> </Link></Button>
                </Box>
                <Box>
                    <IconButton  color='inherit'>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to={'/cart'}>
                            <Badge badgeContent={cartCount} color='inherit'>
                                <ShoppingCartIcon color='inherit'></ShoppingCartIcon>
                            </Badge>
                        </Link>
                    </IconButton>
                    <Button onClick={logout} sx={{ '&:hover': { color: '#44d62c', textDecoration: 'underline', transform: 'scale(1.1,1.1)' } }} color='inherit'><Link style={{ textDecoration: 'none', color: 'white' }} to={'/signIn'}><Typography variant='h6'>Log Out</Typography> </Link></Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
