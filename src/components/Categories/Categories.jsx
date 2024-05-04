import React from 'react'
import'./Categories.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RotatingLines } from 'react-loader-spinner';
import axios from 'axios';
import { useQuery } from 'react-query';
import {Helmet} from "react-helmet";


export default function Categories() {

    function Categorie() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);

    }
    let { isError, isLoading, data } = useQuery("cat", Categorie)
    let cat = data?.data.data;
    console.log(cat);
   
    return <>
   
     <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
               <link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
            </Helmet>
{isLoading ? <> 

<div className='d-flex justify-content-center w-100 position-fixed bg-main h-100 top-0 bottom-0'>
<RotatingLines
  strokeColor="white"
  strokeWidth="5"
  animationDuration="0.75"
  width="20"
  visible={true} />
</div>
</>  
: <>
<div className="container Categories my-5 text-center minH">

<div className='row g-4'>

{cat ? <>
   {cat.map((item) => (
          <>
          <div className='col-lg-4 col-md-6 col-sm-12 cursor-pointer'>
            <div className='card'>
                <div className="card-img">
                    <img key={item._id} src={item.image} alt={item.name} height={300} className='w-100  catSlider' />
                </div>

              <h5 className='mt-3'>{item.name}</h5>
            </div>
              </div>
          </>
      ))}
   </>
  : ''}

</div>
</div>
</>
}

    


    </>
}
