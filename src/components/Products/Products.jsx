import React, { useContext, useEffect, useState } from 'react';
import './Products.css';
import axios from 'axios';
import { ClockLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function Products() {
  let { addToCart } = useContext(CartContext);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
        setProducts(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
        toast.error('An error occurred while fetching products');
      }
    };

    fetchProducts();
  }, [page]);

  async function addProductToCart(id) {
    try {
      let response = await addToCart(id);
      
      if (response?.data?.status === 'success') {
        toast.success('Product Successfully added');
      } else {
        // Handle the error case
        toast.error('Failed to add product to cart');
      }
    } catch (error) {
      
      console.error('Error adding product to cart:', error);
      toast.error('An error occurred while adding the product to the cart');
    }
  }

  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/market.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Products</title>
      </Helmet>
      {isLoading ? (
        <div className='w-100 d-flex justify-content-center align-items-center position-fixed start-0 end-0 top-0 bottom-0 bg-white z-3'>
          <ClockLoader color="#4FA74F" />
        </div>
      ) : (
        ''
      )}
      <div className="products">
        <div className="container">
          <div className="productsContant">
            <div className="row g-3">
              {products.map((product) => {
                return (
                  <div key={product.id} className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <div className="product overflow-hidden position-relative h-100 cursor-pointer">
                      <div className='p-4'>
                        <Link to={`/productsDetails/${product.id}`}>
                          <img src={product.imageCover} className='w-100' alt={product.title} />
                          <h6 className='textMain'>{product.category.name}</h6>
                          <h5>{product.title.split(' ').slice(0, 2).join('')}</h5>
                          <div className="d-flex justify-content-between">
                            <p>
                              <span>{product.price}</span> <span>EGP</span>
                            </p>
                            <p>
                              <i className='fas fa-star text-warning'></i> <span>{product.ratingsAverage}</span>
                            </p>
                          </div>
                        </Link>
                        <div className="mb-4"></div>
                        <button onClick={() => addProductToCart(product.id)} className='adding btn btn-success bgMain m-auto w-90  position-absolute end-0 start-0'>
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
