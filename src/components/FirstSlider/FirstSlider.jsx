import React from 'react'
import Style from './FirstSlider.module.css'
import firstImg from '../../assets/images/images/slider-image-3.jpeg'
import secImg from '../../assets/images/images/slider-image-1.jpeg'
import thiImg from '../../assets/images/images/slider-image-2.jpeg'
import Slider from "react-slick";
import furImg from '../../assets/images/images/grocery-banner.png'
import fivImg from '../../assets/images/images/grocery-banner-2.jpeg'
import { Helmet } from 'react-helmet'

export default function FirstSlider() {
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
        slidesToScroll: 1,
    arrows:false,
  };
    return <>
        <Helmet>
      <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
    
    </Helmet>
        <div className="container pt-4">
            <div className="row g-0">
                <div className="col-md-8">
                    <Slider {...settings}>
                <img src={firstImg} height={400} className='w-100' alt={'product'} />
                <img src={secImg} height={400}  className='w-100' alt={'product'} />
                <img src={thiImg} height={400}  className='w-100' alt={'product'} />
                </Slider>
                </div>
                <div className="col-md-4">
                    <img src={furImg} height={200}  className='w-100' alt={'product'} />
                <img src={fivImg} height={200} className='w-100' alt={'product'} />
                </div>
                </div>

    </div>
    </>
}
