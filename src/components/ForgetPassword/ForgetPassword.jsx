import React, { useEffect, useState } from 'react'
import Style from './ForgetPassword.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import $ from 'jquery'
import { Helmet } from 'react-helmet';

export default function ForgetPassword() {
    
    const [error, setError] = useState(null);
    const [error2 ,setError2]=useState(null);
    const [isLoding ,setisLoding] = useState(false);
    let navigate = useNavigate();
    let users ={
        email:'',
    };
    let users2 ={
        resetCode:'',
    };
        let validationSchema = Yup.object({
        email:Yup.string().required('email is required').email('eniter valid email'),
        });
    let validationSchema2 = Yup.object({
        resetCode:Yup.string().required('the code is required')
    });


    async function ForgetForm(val){
        setisLoding(true);
        let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',val).catch((error)=>{
        setisLoding(false)
            setError(error.response.data.message);
            

        });
    
    if(data.statusMsg === 'success'){
        setisLoding(false)
        $('.emailForm').addClass('d-none')
        $('.codeForm').removeClass('d-none').addClass('d-block')

        
    }
    
    };
    async function codeForm(val) {
        
        setisLoding(true);
        let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',val).catch((error2)=>{
            
            
        setisLoding(false)
            setError2(error2.response.data.message);
            

        });
    
    if(data.status === 'Success'){
        setisLoding(false)
        navigate('/restPassword')
        
        
        


        
        }
    else {
        setisLoding(false)
        }
    
    };

    let formik =useFormik({
        initialValues:users,
        validationSchema,
        onSubmit:ForgetForm,
    });

    let formikcode =useFormik({
        initialValues:users2,
        validationSchema:validationSchema2,
        onSubmit:codeForm,
    });


    return <>
        <Helmet>
      <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
    <title>Forget Password</title>
    </Helmet>
    <div className="forgetPassword mb-3 py-5">
            <div className="container pb-5">
                
                <form onSubmit={formik.handleSubmit} className='py-5 emailForm'>
                    <h2 className='py-4'>please enter your verification email</h2>
                    {error  !==null ? <div className='alert alert-danger '> <i className="fa-solid fa-exclamation mx-2"></i> {error}</div> : '' } 
                    <label className='mt-3' htmlFor='Email'>Email</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control my-2 ' type='email' name='email' id='Email' />
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}
                    
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
                    <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-success bgMain px-5 text-white d-block m-auto' type='submit'>Verify</button>
                    
                }
                </form>
                <form className='py-5 codeForm d-none' onSubmit={formikcode.handleSubmit}>
                    <h2 className='py-4'>reset your account password</h2>
                    {error2  !==null ? <div className='alert alert-danger '> <i className="fa-solid fa-exclamation mx-2"></i> {error2}</div> : '' } 
                    <label className='mt-3' htmlFor='resetCode'>Code</label>
                <input onBlur={formikcode.handleBlur} onChange={formikcode.handleChange} className='form-control my-2 ' type='tel' name='resetCode' id='resetCode' />
                    {formikcode.errors.resetCode && formikcode.touched.resetCode ? <div className='alert alert-danger'>{formikcode.errors.resetCode}</div> : ''}
                    
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
                    <button disabled={!(formikcode.isValid && formik.dirty)} className='btn btn-success bgMain px-5 text-white d-block m-auto' type='submit'>Submit code</button>
                    
                }
                </form>
        </div>
    </div>
    </>
}
