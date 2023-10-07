import React from 'react'
import style from './Orders.module.css';
import { Helmet } from 'react-helmet';
export default function Orders() {
    return <>
   <Helmet>
<meta charSet="utf-8" />
<title>Oders</title>
<link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
</Helmet>
       <div className="container Orders vh-100 d-flex justify-content-center align-items-center">
           <h2 className='fw-bold'>THANK YOU for ordrs from us</h2> 
       </div>
    </>
}