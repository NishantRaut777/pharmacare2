import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  deleteFromCart,
  deleteFromCartFailure,
  deletingFromCart,
  getCart,
  addToCart,
  addToCartFailure,
  addingToCart,
} from "../../redux/cart/cartSlice.js";
import { message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./MyCart.css";
import Header2 from "../../components/Header2";
import { Link, useNavigate } from "react-router-dom";
import Footer2 from "../../components/Footer2";
import axiosInstance from "../../api/axios.js";

const MyCart = () => {
  const { cartData } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchCartData = async () => {
      const res = await axiosInstance.get(`/api/cart/cartItems/${currentUser?._id}`);
      dispatch(getCart(res.data));
    };
    fetchCartData();
  }, []);

  const handleDeleteFromCart = async (productId) => {
    try {
      dispatch(deletingFromCart());
      const res = await axiosInstance.delete(
        `/api/cart/deleteCartItem/${currentUser._id}/${productId}`
      );
      dispatch(deleteFromCart(res.data));
      message.success("Product deleted from cart successfully");
    } catch (error) {
      console.log(error);
      dispatch(deleteFromCartFailure(error));
      message.error("Something went wrong!");
    }
  };

  const handleAddToCart = async (productId, incrORdecr) => {
    try {
      if (!currentUser) {
        message.error("Please login to buy products");
        return;
      }
      dispatch(addingToCart());
      const res = await axiosInstance.post(
        `/api/cart/addCartItemIncrDecr/${currentUser._id}`,
        {
          productId: productId,
          type: incrORdecr,
        }
      );
      // console.log(res.data);
      dispatch(addToCart(res.data));
      if (incrORdecr === "INCR"){
        message.success("Item added successfully");
      } else if (incrORdecr === "DECR"){
        message.success("Item removed successfully");
      }
      
    } catch (error) {
      dispatch(addToCartFailure(error));
      message.error("Something went wrong!");
    }
  };

  // my-cart-item-container-1 is for mobile and my-cart-item-container-2 is for desktop

  return (
    <>
      <Header2 />
      <div className="my-cart-outer-main-container">
        <h1>My Cart</h1>
        <div className="my-cart-item-container-1">
          {loading ? (
            <Spin
              className="spin-loader"
              indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
            />
          ) : (
            cartData &&
            cartData?.items.map((cartItem) => (
              <div className="my-cart-product">
                <div className="my-cart-image">
                  <img src={cartItem?.imagesrc} alt="..." />
                </div>

                <div className="my-cart-desc">
                  <div>{cartItem?.name}</div>
                  <div>Quantity: {cartItem?.quantity}</div>
                  <i
                    class="fa-solid fa-minus quantity-decrement"
                    style={{ color: "#ef0b2d", marginRight: "0.4rem", cursor: "pointer", padding: "0.3rem 0.3rem", borderRadius: "50%" }}
                    onClick={() => {
                      handleAddToCart(cartItem?.productId, "DECR");
                    }}
                  ></i>
                  <i
                    class="fa-solid fa-plus quantity-increment"
                    style={{ color: "#2adf3f", marginRight: "0.4rem", cursor: "pointer", padding: "0.3rem 0.3rem", borderRadius: "50%" }}
                    onClick={() => {
                      handleAddToCart(cartItem?.productId, "INCR");
                    }}
                  ></i>
                </div>

                <div className="my-cart-price">
                  <span>₹{cartItem?.price}</span>
                </div>

                <div className="my-cart-delete-icon">
                  <i
                    class="fa-duotone fa-solid fa-trash"
                    style = {{ cursor: "pointer" }}
                    onClick={() => handleDeleteFromCart(cartItem?.productId)}
                  ></i>
                </div>
              </div>
            ))
          )}

          <div className="summary-info-outer-container">
            <h4>Summary</h4>
            <div className="summary-info-container">
              <div>
                <span>Total Items: {cartData?.items?.length}</span>
              </div>

              <div>
                <span>Total Price: {cartData?.bill}</span>
              </div>

              <button>
                <Link
                  to={"/checkout"}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Checkout{" "}
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="my-cart-item-container-2">
          <div className="my-cart-item-inner-container-left">
            {loading ? (
              <Spin
                className="spin-loader"
                indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
              />
            ) : (
              cartData &&
              cartData?.items.map((cartItem) => (
                <div className="my-cart-product-2">
                  <div className="my-cart-image-2">
                    <img src={cartItem?.imagesrc} alt="..." />
                  </div>

                  <div className="my-cart-desc-2">
                    <div>
                      <h6>{cartItem?.name}</h6>
                    </div>

                    <div className="quantity-price-container">
                      <span>₹{cartItem.price}</span>
                      <div>
                        <i
                          class="fa-solid fa-minus quantity-decrement"
                          style={{ color: "#ef0b2d", marginRight: "0.4rem", cursor: "pointer", padding: "0.1rem 0.3rem", borderRadius: "50%" }}
                          onClick={() => {
                            handleAddToCart(cartItem?.productId, "DECR");
                          }}
                        ></i>
                        <i
                          class="fa-solid fa-plus quantity-increment"
                          style={{ color: "#2adf3f", marginRight: "0.4rem", cursor: "pointer", padding: "0.1rem 0.3rem", borderRadius: "50%"  }}
                          onClick={() => {
                            handleAddToCart(cartItem?.productId, "INCR");
                          }}
                        ></i>

                        <i
                          class="fa-duotone fa-solid fa-trash"
                          style = {{ cursor: "pointer" }}
                          onClick={() =>
                            handleDeleteFromCart(cartItem?.productId)
                          }
                        ></i>
                      </div>
                    </div>

                    <div>Quantity : {cartItem?.quantity}</div>
                  </div>

                  <div></div>
                </div>
              ))
            )}
          </div>

          <div className="my-cart-item-inner-container-right">
            <h4>Summary</h4>
            <div className="summary-info-container">
              <div>
                <span>Total Items: {cartData?.items?.length}</span>
              </div>

              <div>
                <span>Total Price: {cartData?.bill}</span>
              </div>

              <button>
                <Link
                  to={"/checkout"}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Checkout{" "}
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer2  isBottom={true}/>
    </>
  );
};

export default MyCart;
