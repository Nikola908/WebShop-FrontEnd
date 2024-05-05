import React from 'react'
import { Navbar } from '../../components/UserComponents/Navbar'
import UserOrders from '../../components/UserComponents/UserOrders'

const UserOrdersPage = () => {
  return (
    <>
      <Navbar />
      <UserOrders />
    </>
  )
}

export default UserOrdersPage