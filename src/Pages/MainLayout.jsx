import React from 'react'
import { Navbar } from '../components/UserComponents/Navbar';
import NavBarAdmin from '../components/AdminComponents/NavBarAdmin';

const MainLayout = () => {
  console.log('caos')
  return (
    <>
      {localStorage.getItem('role')==='admin' ? <NavBarAdmin/> : null}
      {localStorage.getItem('role')==='user'  ? <Navbar/>: null}
    </>
    
  )
}

export default MainLayout