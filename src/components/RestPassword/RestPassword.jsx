import React, { useContext, useEffect, useState } from 'react';
import  './RestPassword.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { Axios } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { RotatingLines } from  'react-loader-spinner';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function Login() {
    const PassworedRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    let {setUserToken} = useContext(UserContext);
    const [error ,setError]=useState(null);
    const [isLoding ,setisLoding] = useState(false);
    let navigate = useNavigate();
    let users ={
        email:'',
        newPassword:''
    };
        let validationSchema = Yup.object({
        email:Yup.string().required('email is required').email('eniter valid email'),
        newPassword: Yup.string().matches(PassworedRegExp, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character').required('Password is required'),
    });


    async function restfrom(val){
        setisLoding(true);
        let {data} =await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',val).catch((error)=>{
            setisLoding(false)
        
        setError(error.response.data.message);

        });
    
    if(data.token){
        setisLoding(false)
        navigate('/login')
    }
    
    };
    let formik =useFormik({
        initialValues:users,
        validationSchema,
        onSubmit:restfrom,
    });


    return <>
        <Helmet>
      <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
    <title>Rest Password</title>
    </Helmet>
        <div className="container Login pt-3">
            <div className="contant pt-5">

            
            <h2 className='my-5'>Rest Password</h2>
                <form onSubmit={formik.handleSubmit}>
                {error  !==null ? <div className='alert alert-danger '> <i className="fa-solid fa-exclamation mx-2 errorLogin"></i> {error}</div> : '' } 

                <label className='mt-3' htmlFor='Email'>Email</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control my-2 ' type='email' name='email' id='Email' />
                {formik.errors.email && formik.touched.email? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}

                <label className='mt-3' htmlFor='newPassword'>Password</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control my-2 ' type='password' name='newPassword' id='newPassword' />
                    {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger'>{formik.errors.newPassword}</div> : ''}
                    
                    <div className="d-flex align-items-center my-2">
                        
            
                </div>
                {isLoding ? <button className='btn btn-success bgMain px-5 text-white d-block m-auto'> 
                    <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible={true}
                    />
                    </button>
                    :
                    <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-success bgMain px-5 text-white d-block m-auto' type='submit'>Rest Password</button>
                    
                }
            </form>
            </div>
        </div>
    </>
}