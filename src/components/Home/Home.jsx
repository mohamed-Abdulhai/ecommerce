import React, { useEffect } from 'react'
import Style from './Home.module.css'
import Products from '../Products/Products'
import CategorieySlider from '../categorieySlider/categorieySlider';
import FirstSlider from '../FirstSlider/FirstSlider'
import { Helmet } from 'react-helmet';

export default function Home() {
   
    
    return <>
        <Helmet>
      <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
    <title>Fresh Cart</title>
    </Helmet>
        <FirstSlider/>
    <CategorieySlider/>
    <Products/>
    </>
}
