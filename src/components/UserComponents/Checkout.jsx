import { Button } from '@mui/material'
import React from 'react'

const Checkout = () => {
    const checkout= async()=>{
        await fetch('https://localhost:44380/Checkout', {
                    method: 'POST',
                    body: JSON.stringify([{
                              productId: 1,
                              productName: "Razer Baracuda Headset",
                              quantity: 2,
                              price: 150,
                              productImage: "https://assets2.razerzone.com/images/pnx.assets/57c2af30b5d9a2b699b3e896b788e00f/blackshark-v2-x-usb-500x500-category.jpg"
                            
                          
                    }]),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
    }
  return (
    <div>
        <Button size='large' sx={{backgroundColor:'black'}} onClick={()=>checkout()}></Button>
    </div>
  )
}

export default Checkout