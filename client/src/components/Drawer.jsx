import React, { useEffect, useState } from 'react';
// import Drawer from 'react-modern-drawer';
import "../styles/Drawer.css";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { deleteFromCart, deleteFromCartFailure, deletingFromCart, getCart } from '../redux/cart/cartSlice';
import { message , Spin} from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

const DrawerCustom = ({ setCartActive }) => {

  const [cartDisable, setCartDisable] = useState(false);
  const { cartData } = useSelector((state) => state.cart);
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

   useEffect(() => {
    const fetchCartData = async() => {
      const res = await axiosInstance.get(`/api/cart/cartItems/${currentUser?._id}`);
      dispatch(getCart(res.data));
    }
    fetchCartData();
    
  },[]);

  const handleDeleteFromCart = async(productId) => {
    try {
      dispatch(deletingFromCart());
      const res = await axiosInstance.delete(`/api/cart/deleteCartItem/${currentUser._id}/${productId}`);
      dispatch(deleteFromCart(res.data));
      message.success("Product deleted from cart successfully");

    } catch (error) {
      console.log(error);
      dispatch(deleteFromCartFailure(error));
      message.error("Something went wrong!");
    }
  };

  const handleDisableCart = async() => {
    try{
      setCartDisable(true);
      setCartActive(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      { !cartDisable ?  
      <div
                // open={open}
                // onClose={onClose}
                // direction={direction}
                // size = {size}
                className='drawer-main-container'
                >   
                <div className="drawer-container-heading">
                  <h1 className='main-heading'>Your Cart</h1>
                  <i class="fa-solid fa-xmark close-icon"
                  onClick={handleDisableCart}
                  ></i>
                </div>
                
                <div
                      className="drawer-item-container"
                    >
                { loading ? <Spin className='spin-loader' indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}/> :
                cartData && cartData?.items.map((cartItem) => (
                      <div className='drawer-product'>
                      <img
                        src={cartItem?.imagesrc}
                        className="drawer-product-image"
                        alt="..."
                      />
                      <div className="">
                        <h6 className="">{cartItem?.name}</h6>
                        <span>Qty: {cartItem?.quantity}</span>
                        {/* <span>{cartItem?.CartQuantity}</span> */}
                        <h6 className="">&#8377; {cartItem?.price * cartItem?.quantity}</h6>
                        <button className='btn btn-danger' onClick={() => handleDeleteFromCart(cartItem?.productId)}>Delete</button>
                      </div>
                      </div>
                    
                )
                )}
                </div>

                <span style={{ fontWeight: "bold" }}>{cartData?.items?.length  > 0 ? <div className='total-Cart-Products'>Total: &#8377; {cartData?.bill}</div> : <div>"You dont have any products in cart"</div>}</span>
                
                { cartData?.items?.length  > 0 ? 
                <button className="btn btn-success m-2">
                    <Link
                      to={"/checkout"}
                      className="ul-link"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Checkout
                    </Link>
                  </button>:
                  ""
                }
                
    </div>:
    ""
    }
    </>
    
    
  )
}

export default DrawerCustom
