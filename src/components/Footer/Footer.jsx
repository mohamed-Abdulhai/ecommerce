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
                    <div className="firstContant py-2">
                        <h3 className='my-2'>Get the FreshCart app</h3>
                        <p className='text-muted mb-3'>We will send you a link,open it on your phone to download the app. </p>
                        <div className="row">
                            <div className="col-md-10 col-sm-6">
                                <input className='form-control mx-1 my-1' type="email" placeholder='Email' />
                            </div>
                            <div className="col-md-2 col-sm-6">
                                <button type="button" className='w-100 btn btn-success bgMain mx-1 my-1'>Share App Link</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    </footer>
    </>
}
