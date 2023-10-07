import React from 'react'
import Style from './Notfound.module.css'
import img404 from '../../assets/images/6325254.jpg'
export default function Notfound() {
    return <>
        <div className="container py-5 ">
            <h2 className='h1 d-flex justify-content-center'>Notfound</h2>
            <div className='d-flex justify-content-center'>
                <img src={img404} className='w-75 m-auto' alt="404" />
            </div>
        </div>
        
    </>
}
