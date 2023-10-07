import React from 'react';
import ReactDOM from 'react-dom/client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'jquery/dist/jquery.min.js'
import'@fortawesome/fontawesome-free/css/all.min.css'
import'@fortawesome/fontawesome-free/js/all.js'
import './index.css';
import App from './App';
import UserContextProvider from './Context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient = new QueryClient();
root.render(<QueryClientProvider client={queryClient}>
    <UserContextProvider>
    <App />
  </UserContextProvider>
  </QueryClientProvider>
  
    
  
);


