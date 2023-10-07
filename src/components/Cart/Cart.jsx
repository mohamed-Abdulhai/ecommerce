import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext';
import { ClockLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null)
  const [cartDetails1, setCartDetails1] = useState(null)
  const [cartID, setCartid] = useState(null)
  const [isLoding , setIsLoding] = useState(false);
  let { getLoggedUserCart,deleteSpecificCartItem,updateProductQuntity,Clear} = useContext(CartContext)
  async function showGetUserLoggedCart(){
    let { data } = await getLoggedUserCart()
    setIsLoding(true)
    setCartDetails(data)
    console.log(data);
    setCartid(data?.data._id)
    setCartDetails1(data)
    setIsLoding(false)
  }
  async function updateProduct(id,count) {
    let { data } = await updateProductQuntity(id, count)
    setIsLoding(true)
    setCartDetails(data)
    setCartDetails1(data)
    setIsLoding(false)
  }
  async function deleteProduct(id) {
    let { data } = await deleteSpecificCartItem(id)
    setIsLoding(true)
    setCartDetails(data)
    setCartDetails1(data)
    setIsLoding(false)
  }
async function clearCart(){
        
  let { data } = await Clear();
  setIsLoding(true)
  setCartDetails(null);
  setCartDetails1(data)
  setIsLoding(false)
        
    }
    useEffect(() => {
       
      showGetUserLoggedCart()
      
   }, []);
  return <>
    <Helmet>
      <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <title>Cart</title>
    </Helmet>
      {isLoding? <section className='w-100 d-flex justify-content-center align-items-center position-fixed start-0 end-0 top-0 bottom-0 bg-white z-3'>
              <ClockLoader  color="#4FA74F"  />
          </section>:''}
      <div className="cart py-5">
        <div className="container py-2">
          {cartDetails1 ? <div className="w-75 m-auto p-3">
            <h2>Cart Shop</h2>
            <div className="d-flex justify-content-between">
              <h3 className='h5 textMain fw-bolder'>Cart Items: <span>{cartDetails1.numOfCartItems}</span></h3>
              <h3 className='textMain fw-bolder'>Total Cart Price: <span>{cartDetails1.data.totalCartPrice} EGP</span></h3>
            </div>
            
            {cartDetails.data.products.map((product) => <div key={product.product.id} className='row my-0 py-0 d-flex align-items-center'>
              <div className="col-md-12 bg-body-tertiary px-0 py-2 ">
                <div className="row d-flex align-items-center mb-0">
                  <div className="col-md-2">
                    <img src={product.product.imageCover} className='w-100 py-0' alt={product.product.title} />
                  </div>
                  <div className="col-md-8">
                    
                    <h5 className='textMain'>{product.product.title}</h5>
                    <h5>{product.price} EGP</h5>
                    <div className=" d-flex justify-content-between">
                      <button onClick={() => deleteProduct(product.product.id)} className='btn bg-transparent text-danger'><i className='fas fa-trash'></i> Remove</button>
                      <div className='d-flex align-items-center'>
                        <button onClick={() => updateProduct(product.product.id, product.count + 1)} className='textMain bg-transparent p-2 borderMain'>+</button>
                        <span className='d-flex align-items-center mx-2'>{product.count}</span>
                        {product.count ? <button onClick={() => updateProduct(product.product.id, product.count - 1)} className='textMain bg-transparent p-2 borderMain'>-</button> : ''}
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
              <hr />
            </div>)}
            <button className='w-100 btn bgMain btn-success mb-3 mt-2' onClick={() => clearCart()}>Clear Cart</button>
            <div className="d-flex justify-content-around">
              <Link to={'/address'} className=' w-25 btn bgMain btn-success'>Pay online</Link>
              <Link to={'/orders'} className=' w-25 btn bgMain btn-success'>Pay on Cash</Link>
            </div>
            
          </div> : ''} 
    </div>
      </div>
      </>
}
