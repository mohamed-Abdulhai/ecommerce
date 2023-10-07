import React, { useContext, useEffect, useState } from 'react'
import  './Navbar.css'
import Logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet'








export default function Navbar() {
  let [cartCount, setCartCount] = useState(0)
  let {getLoggedUserCart}=useContext(CartContext) ;
  let { userToken, setUserToken } = useContext(UserContext)
  let navigate = useNavigate();
   async function cartNum(){
        let {data}= await getLoggedUserCart();
        setCartCount(data);
    }
  function logout() {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }

  useEffect(()=>{
        cartNum();
    });
  return <>
      <Helmet>
      <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      
    </Helmet>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to=""><img src={Logo} className='w-100' alt="Logo" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
        {userToken !== null ? <>
        <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive == true ? 'nav-link navActive' : 'nav-link'} to={"/"}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=> isActive == true ? 'nav-link navActive' : 'nav-link'} to="cart">Cart</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className={({isActive})=> isActive == true ? 'nav-link navActive' : 'nav-link'} to="products">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=> isActive == true ? 'nav-link navActive' : 'nav-link'} to="categories">Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=> isActive == true ? 'nav-link navActive' : 'nav-link'} to="brands">Brands</NavLink>
        </li>                
        </>:''}
        
        
        
    </ul>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
                <Link to='https://www.facebook.com/' target='_blank' className='Ancor'><i className='fab fa-facebook-f mx-2'></i></Link>
                <Link to='https://www.instagram.com/' target='_blank' className='Ancor'><i className='fab fa-instagram mx-2'></i></Link>
                <Link to='https://www.x.com/' target='_blank' className='Ancor'><i className='fab fa-x-twitter mx-2'></i></Link>
                <Link to='https://www.youtube.com/' target='_blank' className='Ancor'><i className='fab fa-youtube mx-2'></i></Link>
                <Link to='https://www.linkedin.com/' target='_blank' className='Ancor'><i className='fab fa-linkedin-in mx-2'></i></Link>
                <Link to='https://www.tiktok.com/' target='_blank' className='Ancor'><i className='fab fa-tiktok mx-2'></i></Link>
              </li>
              {userToken !== null ? <>
                <li className='nav-item position-relative mx-3'>
                            <Link className='nav-link' to={'/cart'}><i className="fa-solid fa-cart-shopping"></i> <span className='cartCount'>{ cartCount?.numOfCartItems ? cartCount?.numOfCartItems : 0}</span></Link>
                            </li>
              <li className="nav-item">
                  <span onClick={() => { logout() }} className="nav-link text-danger cursor-pointer">Logout<i className="fa-solid fa-right-from-bracket mx-1"></i></span>
                </li>
                
              </>
                : <>
                <li className="nav-item">
                  <NavLink className={({isActive})=> isActive == true ? 'nav-link navActive' : 'nav-link'} to="login">Login</NavLink>
              </li>
    
              <li className="nav-item">
                <NavLink className={({isActive})=> isActive == true ? 'nav-link navActive' : 'nav-link'} to="register">Register</NavLink>
              </li>
              </>
              }
    
    
    </ul>
      
    </div>
  </div>
</nav>
    </>
}
