import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from  'react-loader-spinner';
import { Helmet } from 'react-helmet';


export default function Register() {
    const PassworedRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const [error ,setError]=useState(null);
    const [isLoding ,setisLoding] = useState(false);
    let navigate = useNavigate();
    let users ={
        name :'',
        email:'',
        password:'',
        rePassword:'',
        phone:'',
    };
        let validationSchema = Yup.object({
        name:Yup.string().min(4 , "name minlength is 4").max(20,"name maxlength is 20").required("name is required"),
        email:Yup.string().required('email is required').email('eniter valid email'),
        phone:Yup.string().required('phone is required').matches(/^[0-9]{11}$/ , " Please enter egption phone "),
        password: Yup.string().matches(PassworedRegExp, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character').required('Password is required'),
        rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password') , 'passowrd and repassowrd is not match']),
    });


    async function submiyForm(val){
        setisLoding(true);
        let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',val).catch((error)=>{
        setisLoding(false)
        setError(error.response.data.message);

        });
    // console.log(data );
    if(data.message === 'success'){
        setisLoding(false)
        navigate('/login')
    }
    
    };
    let formik =useFormik({
        initialValues:users,
        validationSchema,
        onSubmit:submiyForm,
    });

    useEffect(() => {
     document.title = "Register";  
   }, []);

    return <>
        <Helmet>
      <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
    <title>Register</title>
    </Helmet>
        <div className="container Register py-5">
    
            <h2 className='my-3'>Register Now</h2>
            {error  !==null ? <div className='alert alert-danger '> <i className="fa-solid fa-exclamation mx-2 errorLogin"></i> {error}</div> : '' } 
            <form onSubmit={formik.handleSubmit}>
                <label className='mt-3' htmlFor='Name'>Name</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control my-2 ' type='text' name='name' id='Name' />
                {formik.errors.name && formik.touched.name? <div className='alert alert-danger'>{formik.errors.name}</div> : ''}

                <label className='mt-3' htmlFor='Email'>Email</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control my-2 ' type='email' name='email' id='Email' />
                {formik.errors.email && formik.touched.email? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}

                <label className='mt-3' htmlFor='phone'>Phone</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control my-2 ' type='tel' name='phone' id='phone' />
                {formik.errors.phone && formik.touched.phone? <div className='alert alert-danger'>{formik.errors.phone}</div> : ''}

                <label className='mt-3' htmlFor='password'>Password</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control my-2 ' type='password' name='password' id='password' />
                {formik.errors.password && formik.touched.password? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}

                <label className='mt-3' htmlFor='rePassword'>rePassword</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control my-2 ' type='password' name='rePassword' id='rePassword' />
                {formik.errors.rePassword && formik.touched.rePassword? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ''}

                {isLoding ? <button className='btn btn-success bgMain px-5 text-white d-block ms-auto'> 
                    <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible={true}
                    />
                    </button>
                    :
                    <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-success bgMain px-5 text-white d-block ms-auto' type='submit'>Register</button>
                }
            </form>
        </div>
    </>
}