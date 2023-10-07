import React, { useContext, useEffect, useState } from 'react';
import  './Login.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
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
        password:''
    };
        let validationSchema = Yup.object({
        email:Yup.string().required('email is required').email('eniter valid email'),
        password: Yup.string().matches(PassworedRegExp, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character').required('Password is required'),
    });


    async function LoginForm(val){
        setisLoding(true);
        let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',val).catch((error)=>{
        setisLoding(false)
        setError(error.response.data.message);

        });
    
    if(data.message === 'success'){
        setisLoding(false)
        localStorage.setItem('userToken', data.token)
        setUserToken(data.token)
        navigate('/')
    }
    
    };
    let formik =useFormik({
        initialValues:users,
        validationSchema,
        onSubmit:LoginForm,
    });

    return <>
        <Helmet>
      <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
    <title>Login</title>
    </Helmet>
        <div className="container Login pt-3">
            <div className="contant pt-5">

            
            <h2 className='my-5'>Login Now</h2>
            {error  !==null ? <div className='alert alert-danger '> <i className="fa-solid fa-exclamation mx-2 errorLogin"></i> {error}</div> : '' } 
            <form onSubmit={formik.handleSubmit}>
                <label className='mt-3' htmlFor='Email'>Email</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control my-2 ' type='email' name='email' id='Email' />
                {formik.errors.email && formik.touched.email? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}

                <label className='mt-3' htmlFor='password'>Password</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control my-2 ' type='password' name='password' id='password' />
                    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}
                    
                    <div className="d-flex align-items-center my-2">
                        <Link to={'/forgetPassword'} className='textMain text-decoration-none me-auto'>Forget Password</Link>
                    <Link className="textMain text-decoration-none ms-auto" to={"/register"}>Register if you don't have account</Link>
               
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
                    <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-success bgMain px-5 text-white d-block m-auto' type='submit'>Login</button>
                    
                }
            </form>
            </div>
        </div>
    </>
}