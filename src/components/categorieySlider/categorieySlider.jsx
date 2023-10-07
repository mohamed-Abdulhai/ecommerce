import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet';
import {  useQuery } from 'react-query';
import Slider from "react-slick";
import { ClockLoader } from 'react-spinners';

export default function CategorieySlider() {
    var settings = {
    autoplay:true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:8 ,
        slidesToScroll: 1,
    autoplaySpeed:300
  };
    function getCatories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    let { isLoading, data, isError } = useQuery('CategorieySlider', getCatories)
    let cat = data?.data.data
    
    return <>
        <Helmet>
      <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
    
    </Helmet>
        {isLoading?<div className='w-100 d-flex justify-content-center align-items-center position-fixed start-0 end-0 top-0 bottom-0 bg-white z-3'>
            <ClockLoader  color="#4FA74F"  />
        </div>:''}
        <div className="container py-4">
            <h2 className='pt-4'>Shop Popular Categories</h2>
            {cat ?<Slider {...settings}>
      {cat.map( (categoriey) => <img height={200} key={categoriey._id} src={categoriey.image} className='w-100' alt={categoriey.name} />)}
    </Slider>:''}
        </div>
        
    </>
}
