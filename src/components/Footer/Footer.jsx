import React from 'react'
import  './Footer.css'
import amzon from '../../assets/images/icons/amazon-pay.png'
import card from '../../assets/images/icons/card.png'
import american from '../../assets/images/icons/american-express.png'
import paypal from '../../assets/images/icons/paypal.png'
import google from '../../assets/images/icons/game.png'
import apple from '../../assets/images/icons/app-store.png'
import { Helmet } from 'react-helmet'

export default function Footer() {
    return <>
        <Helmet>
      <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
    
    </Helmet>
        <footer className='py-4 bg-body-tertiary position-relative bottom-0 start-0 end-0 mt-3'>
            <div className="container">
                <div className="footer">
                    <div className="text-content">
                    <h3>Get the Cart app</h3>
                    <p className='text-muted'>We will send you a link, open it on your phone to download</p>
                </div>
                    <div className="row">
                        <div className="col-md-10">
                            <input type="email" className='mx-1 form-control my-2' name='email' />
                        </div>
                        <div className="col-md-2">
                            <button className=' btn bgMain btn-success w-100 mx-1 my-2'>Share App Link</button>
                        </div>
                    </div>
                    <hr className='my-4' />
                    <div className="d-flex justify-content-between">
                        <div className="icons d-flex align-items-center">
                            <span className='h5 mx-2'>Payment Partners</span>
                            <img src={amzon} className=' mx-1'  alt="" />
                            <img src={american} className=' mx-1' alt="" />
                            <img src={card} className=' mx-18 alt=""' />
                            <img src={paypal} className=' mx-1' alt="" />
                        </div>
                        <div className="icons d-flex justify-content-end align-items-center">
                            <span className='h5 mx-2'>Get deliveries with Fresh Cart</span>
                            <img src={google} className=' mx-1' alt="" />
                            <img src={apple} className=' mx-1' alt="" />
                        </div>
                    </div>
                    <hr className='mt-4' />
                </div>
            </div>
    </footer>
    </>
}
