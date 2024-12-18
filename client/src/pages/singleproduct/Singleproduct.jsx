import React, { useEffect, useState } from 'react';
import { message, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router';
import axios from "axios";
import "./Singleproduct.css";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, addToCartFailure, addingToCart} from '../../redux/cart/cartSlice';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GoToTop from '../../components/GoToTop';
import Header2 from "../../components/Header2";
import SimiliarProduct from "../../components/SimiliarProduct";
import Footer2 from "../../components/Footer2";
import axiosInstance from '../../api/axios';

const Singleproduct = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    // console.log(path);
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const [similiarProducts, setSimiliarProducts] = useState([]);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { cartData, loading } = useSelector((state) => state.cart);

    useEffect(() => {
      const getProduct = async() => {
        const res = await axiosInstance.get('/api/product/' + path);
        setProduct(res?.data);
      };

      getProduct();
    },[path]);


    // setting similiar products
    useEffect(() => {
      const getSimiliarProducts = async() => {
        const res = await axiosInstance.get('/api/product/similiarProducts/' + path);
        setSimiliarProducts(res?.data?.data);
        console.log(similiarProducts);
      }

      getSimiliarProducts();
    }, [path]);

    const handleAddToCart = async() => {
      try {
        if(!currentUser){
          message.error("Please login to buy products");
          return;
        }
        dispatch(addingToCart());
        const res = await axiosInstance.post(`/api/cart/addCartItem/${currentUser._id}`, {
          productId: product?._id,
          quantity: quantity
        });
        // console.log(res.data);
        dispatch(addToCart(res.data));
        message.success("Item added successfully");

      } catch (error) {
        dispatch(addToCartFailure(error));
        message.error("Something went wrong!");
      }
  }

  return (
    <>
    {/* <Header /> */}
    <Header2 />
    { loading ? <Spin className='spin-loader' indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}/> :
      <section className='single-product-section'>
      <div className="single-product-container">

        <div className='img-div'>
            <img src={product?.imagesrc} alt="" />
        </div>

        <div className='product-info-container'>
        <h3>{product?.name}</h3>
          <span className='rating-span'>{product?.rating} <i class="fa-solid fa-star" style={{ color: "#FFD43B"}}></i></span>
          <h4 className='price'>&#8377; {product?.price}</h4>
          <p>{product?.description}</p>
          <ul>
          { product?.features.map((feature) => (
            <li>
              {feature}
            </li>
          ))
          }
          </ul>
          <div className="add-to-cart-container">
            <button className="my-link btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
            <div className='quantity-container'>
              <i class="fa-solid fa-minus" style={{color: "#ef0b2d"}} onClick={() => {quantity === 1 ? setQuantity(1) : setQuantity(quantity-1)}} ></i>
              <span>{quantity}</span>
              <i class="fa-solid fa-plus" style={{color: "#2adf3f"}} onClick={() => setQuantity(quantity + 1)}></i>
            </div>
          </div>
        </div>

        </div>

        <hr />

        <div className='similiar-products-container'>
          <h3>Similiar Products</h3>
          <div className='similiar-products-container-inner-div'>
          { similiarProducts.map((product) => (
                <SimiliarProduct productkey={product._id} productid={product._id} imagesrc = {product.imagesrc} name = {product.name} price = {product.price} rating={product.rating} />
          )) }
          </div>
        </div>
    </section>}
    <GoToTop />
    {/* <Footer /> */}
    <Footer2 />
    </>
  )
}

export default Singleproduct
