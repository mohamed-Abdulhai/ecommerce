import React, { useContext, useEffect, useState } from 'react'
import style from './Address.module.css'
import { useFormik } from 'formik'

import * as Yup from 'yup';
import { RotatingLines } from  'react-loader-spinner';
import {Helmet} from "react-helmet";
import { CartContext } from '../../Context/CartContext';

export default function Address() {
    let {onlinePayment ,cartId } = useContext(CartContext)
    const [isLoding ,setisLoding] = useState(false);
   async function handleSubmitAddress( values  ){
     let response = await onlinePayment( cartId , values  );
    //  console.log(response?.data.session.url);
     window.location.href =response?.data.session.url;
  
    }
    let validationSchema= Yup.object({
      details:Yup.string().required('details is required').min(3, 'minlength is 3 ').max(30,'maxlength is 30'),
      phone:Yup.string().required('phone is required').matches(/^[0-9]{11}$/ , " Please enter egption phone "),
      city:Yup.string().required('city is required').min(3, 'minlength is 3 ').max(30,'maxlength is 30'),
    })
    let formik = useFormik({
        initialValues:{
            details:'',
            phone: '',
            city:''
        },validationSchema,
        onSubmit:handleSubmitAddress
    });


    return <>
<Helmet>
                <meta charSet="utf-8" />
                <title>Address</title>
                 <link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
               
            </Helmet>
       <div className="container Address py-5">
       


          <form onSubmit={formik.handleSubmit} className='py-5'>
            <label htmlFor='details'> details :</label>
            <input type='text' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' name='details' id='details' />
            {formik.errors.details && formik.touched.details? <div className='alert alert-danger'>{formik.errors.details}</div> : ''}


            <label htmlFor='phone'> phone :</label>
            <input type='tel' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' name='phone' id='phone' />
            {formik.errors.phone && formik.touched.phone? <div className='alert alert-danger'>{formik.errors.phone}</div> : ''}


            <label htmlFor='city'> city :</label>
            <input type='text' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' name='city' id='city' />
            {formik.errors.city && formik.touched.city? <div className='alert alert-danger'>{formik.errors.city}</div> : ''}
            {isLoding ? <button className='btn bgMain btn-success w-100 text-white'> 
                <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible={true}
                />
             </button>
             :
             <button disabled={!(formik.isValid && formik.dirty)}  type='submit' className='btn bgMain btn-success my-2 w-100'>Pay Now</button>            }
           
          </form>
       </div>
    </>
}