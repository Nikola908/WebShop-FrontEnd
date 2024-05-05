import React, { createContext, useState, useEffect } from 'react'

export const ShopContext = createContext(null)

export const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [orderProducts, setOrderProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [cartCount, setcartCount] = useState(0)

    const fetchDataProduct = async () => {
        const result = await fetch('https://localhost:44380/api/Product')
        result.json().then(
            json => {
                setProducts(json)
            }
        )
    }
    const fetchDataUsers = async () => {
        const result = await fetch('https://localhost:44380/api/ShopUser')
        result.json().then(
            json => {
                setUsers(json)
            }
        )
    }
    const fetchDataCategories = async () => {
        const result = await fetch('https://localhost:44380/api/Category')
        result.json().then(
            json => {
                setCategories(json)
            }
        )
    }
    const fetchDataOrders = async () => {
        const result = await fetch('https://localhost:44380/api/ShopOrder')
        result.json().then(
            json => {
                setOrders(json)
            }
        )
    }
    const fetchDataOrderProducts = async () => {
        const result = await fetch('https://localhost:44380/api/OrderProduct')
        result.json().then(
            json => {
                setOrderProducts(json)
            }
        )
    }
    useEffect(() => {
        fetchDataProduct();
        fetchDataCategories();
        fetchDataUsers();
        fetchDataOrders();
        fetchDataOrderProducts();
    }, []);

    const addToCart = (id) => {
        if (cartItems === null) {
            setCartItems(() => {
                let cart = {}
                for (let i = 0; i < products.length - 1; i++) {
                    cart[products[i].productId] = 0
                }
                return cart
            })
        }

        setcartCount(prev => prev + 1)
        setCartItems(prev => ({ ...prev, [id]: prev[id] ? prev[id] + 1 : 1 }))
    }
    const removeFromCart = (id) => {
        setcartCount(prev => prev - 1)
        setCartItems(prev => ({ ...prev, [id]: prev[id] - 1 }))
    }

    const clearCartItems = () => {
        setcartCount(0)
        setCartItems({})
    }
    const contextValue = {
        products, users, orderProducts, categories, orders,
        clearCartItems, addToCart, cartItems, removeFromCart, cartCount,
        fetchDataOrderProducts, fetchDataProduct, fetchDataCategories, fetchDataUsers, fetchDataOrders
    }

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>

}