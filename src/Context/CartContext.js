import axios from 'axios'
import { createContext, useState } from 'react'
let userToken = localStorage.getItem('userToken')
let headers = {
    token:userToken
}

export let CartContext = createContext()
 async function addToCart(id) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
        productId:id
    }, {
        headers:headers
    }).then((respons) => respons).catch((error) => error)
    
}
async function onlinePayment(cartId , values){
    return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` , {
        shippingAddress : values
      },{
          headers: headers
      }).then((response)=>response).catch((error)=>error)
  
  }
async function Clear(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,{
        headers:headers
    }).then((response)=>response).catch((error)=>error)
}
async function getLoggedUserCart() {
    
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
    headers
    }).then((respon) => respon).catch((err) => err)
}
async function deleteSpecificCartItem(id) {
    
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers
    }).then((respons) => respons).catch((error) => error)
} 
async function updateProductQuntity(id,count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count}, {
        headers
    }).then((respons) => respons).catch((error) => error)
}
export default function CartContextProvider(props)
{
    let [cartId ,setCartId] =useState(null)
    return <CartContext.Provider value={{addToCart ,getLoggedUserCart,deleteSpecificCartItem ,updateProductQuntity,Clear,onlinePayment}}>
        {props.children}
    </CartContext.Provider>
}