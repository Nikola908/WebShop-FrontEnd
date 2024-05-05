import React from 'react'
import AboutUsPage from './User/AboutUsPage';
import LoginPage from "./User/LoginPage";
import ShopPage from "./User/ShopPage";
import ShoppingCartPage from "./User/ShoppingCartPage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpForm from "../components/UserComponents/SignUpForm";
import SignInForm from "../components/UserComponents/SignInForm";
import ProductsPage from '../Pages/Admin/ProductsPage'
import CategoriesPage from "../Pages/Admin/CategoriesPage";
import UsersPage from "../Pages/Admin/UsersPage";
import OrdersPage from '../Pages/Admin/OrdersPage'
import OrderProductPage from "../Pages/Admin/OrderProductPage";
import UserOrdersPage from './User/UserOrdersPage';
import Checkout from '../components/UserComponents/Checkout';



const Pages = () => {
  return (
    <Router>
      <Routes>
      <Route path='/checkout' element={<Checkout />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='/aboutUs' element={<AboutUsPage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/cart' element={<ShoppingCartPage />} />
        <Route path='/signIn' element={<SignInForm />} />
        <Route path='/signUp' element={<SignUpForm />} />
        <Route path='/myOrders' element={<UserOrdersPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/orders' element={<OrdersPage />} />
        <Route path='/orderProducts' element={<OrderProductPage />} />
      </Routes>
    </Router>
  )
}

export default Pages