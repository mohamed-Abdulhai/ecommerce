import React, { useContext, useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Offline, Online } from "react-detect-offline";
import { Helmet } from 'react-helmet';

export default function Layout() {
    
    return <>
        <Helmet>
      <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
    
    </Helmet>
        <Offline>
            <div className='offline bgMain text-white'>
            <i className='fas fa-wifi'></i> you are offine conact to network</div>
        </Offline>
        <Navbar />
        
        <Outlet />
        <Footer/>
    </>
}
