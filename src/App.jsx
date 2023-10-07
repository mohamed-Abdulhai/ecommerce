import './App.css';
import { RouterProvider,  createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Categories from './components/Categories/Categories'
import Products from './components/Products/Products'
import Notfound from './components/Notfound/Notfound'
import  { UserContext } from './Context/UserContext';
import { useContext, useEffect } from 'react';
import ProtectedRoute from'./components/ProtectedRoute/ProtectedRoute'
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import RestPassword from './components/RestPassword/RestPassword';
import ProductsDetails from './components/ProductsDetails/ProductsDetails'
import CartContextProvider from './Context/CartContext';
import  { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import Address from './components/Address/Address';
import Orders from './components/Orders/Orders';

function App() {
  let {setUserToken} = useContext(UserContext)
    useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setUserToken(localStorage.getItem('userToken'))
    }
  });
  let routs = createHashRouter([
    {
      path:'',element: <Layout />, children: [
        
        { index: true, element:<ProtectedRoute><Home /></ProtectedRoute>  },
        { path: 'login', element: <Login/>},
        { path: 'register', element: <Register /> },
        { path: 'restPassword', element:<RestPassword/>},
        { path: 'forgetPassword', element: <ForgetPassword/>},
        { path: 'cart', element: <ProtectedRoute><Cart/></ProtectedRoute>},
        { path: 'productsDetails/:productId', element: <ProtectedRoute><ProductsDetails/></ProtectedRoute>},
        { path: 'brands', element: <ProtectedRoute><Brands/></ProtectedRoute>},
        { path: 'address', element:<ProtectedRoute><Address/></ProtectedRoute>},
        { path: 'orders', element:<ProtectedRoute><Orders/></ProtectedRoute>},
        { path: 'categories', element: <ProtectedRoute><Categories/></ProtectedRoute>},
        { path: 'products', element: <ProtectedRoute><Products/></ProtectedRoute>},
        { path: '*', element: <Notfound/>},
    ]}
  ])
  return <>
  
    <CartContextProvider>
    <RouterProvider router={routs} />
    <Toaster/>
  </CartContextProvider>
    
    <Helmet>
      <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/market.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
    
    </Helmet>
  </>
  
    
  
  
  
}

export default App;
