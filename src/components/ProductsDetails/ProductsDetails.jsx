import React, { useContext, useEffect, useState } from 'react'
import Style from './ProductsDetails.module.css'
import { useParams } from 'react-router-dom'
import axios, { Axios } from 'axios';
import Slider from "react-slick";
import { useQueries, useQuery } from 'react-query';
import { ClockLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
export default function ProductsDetails() {
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
    };
    let {addToCart} = useContext(CartContext)
    
    async function addProductToCart(id) {
        let respons = await addToCart(id)
        if (respons.data.status === 'success') {
            toast.success('Product Successfully addedd')
        }
        else {
            
        }
    }
    
    let prams = useParams()
    function getProducts(id) {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    let { data, isLoading, isError } = useQuery('ProductsDetails', () => getProducts(prams.productId))
    let product = data?.data.data;
    return <>
        {isLoading?<div className='w-100 d-flex justify-content-center align-items-center position-fixed start-0 end-0 top-0 bottom-0 bg-white z-3'>
            <ClockLoader  color="#4FA74F"  />
        </div>:''}
        <div className='productDetals py-3'>
            <div className="container pb-3 pt-2">
                {product ? <div key={product.id} className='row pb-3 d-flex justify-content-center align-items-center'>
                    <Helmet>
                                        <meta charSet="utf-8" />
                        <title>{ product.title }</title>
                                    <meta name="description" content={product.description} />
                        <meta name="keywords" content="" />
                        <link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
                    </Helmet>
                    
                    <div className="col-md-4">
                        <Slider {...settings}>
                            {product.images.map((img) => <img src={img} className='w100' alt={product.title}/> )}
                        </Slider>
                    </div>
                    <div className="col-md-8">
                        <div className="prodact-contant">
                            <h2 className='h5'>{ product.title }</h2>
                            <p className='text-muted'>{ product.description }</p>
                            <p className='textMain'>{ product.category.name }</p>
                        <div className='d-flex justify-content-between'>
                                <p><span>{ product.price }</span> <span>EGP</span></p>
                                <p><span><i className='fas fa-star text-warning'></i></span><span>{ product.ratingsAverage }</span></p>
                        </div>
                        <button onClick={() => addProductToCart(product.id)} className='btn bgMain btn-success w-100'>Add to cart</button>
                        </div>
                    </div>
                </div> : ''}
                
        </div>
        </div>
    </>
}
