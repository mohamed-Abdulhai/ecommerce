import React from 'react';
import './Brands.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RotatingLines } from 'react-loader-spinner';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Helmet } from "react-helmet";

export default function Brand() {
    const fetchBrands = () => {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    };

    const { isError, isLoading, data, refetch } = useQuery("brand", fetchBrands);
    const brands = data?.data?.data;

    if (isLoading) {
        return (
            <div className='d-flex justify-content-center align-items-center w-100 position-fixed bg-main h-100 top-0 bottom-0'>
                <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="100"
                    visible={true}
                />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center mt-5">
                <p>Failed to load brands. Please try refreshing the page.</p>
                <button onClick={() => refetch()} className="btn btn-primary">Retry</button>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>All Brands</title>
                <link rel="icon" href="%PUBLIC_URL%/market.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
            </Helmet>
            <br />
            <br />
            <h2 className='text-center'>All Brands</h2>
            <div className="container Categories my-5 text-center minH">
                <div className='row g-4'>
                    {brands && brands.map((brand) => (
                        <div key={brand._id} className='col-lg-4 col-md-6 col-sm-12 cursor-pointer'>
                            <div className='card'>
                                <div className="card-img">
                                    <img src={brand.image} alt={`${brand.name} brand logo`} className='w-100 h-100 catSlider' />
                                </div>
                                <h5 className='mt-3'>{brand.name}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
