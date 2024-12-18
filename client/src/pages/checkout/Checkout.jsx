import React , {useState} from 'react'
import { Form, Input, message, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Footer2 from "../../components/Footer2";
import { Link, useNavigate } from 'react-router-dom';
import { logInStart, logInFailure, logInSuccess } from '../../redux/user/userSlice';
import { LoadingOutlined } from '@ant-design/icons';
// import "./Login.css";
import "./Checkout.css";
import { checkoutFailure, checkoutSuccess, doingCheckout } from '../../redux/checkout/checkoutSlice';
import { makeCartEmpty } from '../../redux/cart/cartSlice';
import GoToTop from '../../components/GoToTop';
import Header2 from "../../components/Header2";
import axiosInstance from '../../api/axios';

const Checkout = () => {
    const { loading, error, currentUser } = useSelector((state) => state.user);
    const { cartData } = useSelector((state) => state.cart);
    const { checkoutLoading, checkoutError } = useSelector((state) => state.checkoutProducts);

    const [checkoutInputData, setCheckoutInputData] = useState({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        shippingAddress: "",
        city: "",
        state: "",
        zipCode: "",
        CardNumber: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCheckoutInputData({
            ...checkoutInputData,
            [name]: value
        });
    };

    const handleCheckout = async() =>{
        try {
            dispatch(doingCheckout());
            // console.log(checkoutInputData);
            const res = await axiosInstance.post(`/api/order/checkoutOrder`, {
                userId: currentUser._id,
                fullName: checkoutInputData.fullName,
                emailAddress: checkoutInputData.emailAddress,
                phoneNumber: checkoutInputData.phoneNumber,
                shippingAddress: checkoutInputData.shippingAddress,
                city: checkoutInputData.city,
                state: checkoutInputData.state,
                zipCode: checkoutInputData.zipCode,
                CardNumber: checkoutInputData.CardNumber
            });
            console.log(res);

            if(res.data.success){
                dispatch(makeCartEmpty());
                dispatch(checkoutSuccess());
                message.success("Checkout successful");
                navigate("/");
            } else{
                dispatch(checkoutFailure(res.data.message));
                message.error(res.data.message);
            }


        } catch (error) {
            dispatch(checkoutFailure());
            console.log(error);
            message.error("Something went wrong!");
        }
        
    }

  return (
    <>
    {/* <Header /> */}
    <Header2 />
    {
        cartData?.items?.length === 0 && navigate("/")
    }

    {
        checkoutLoading ? <Spin className='spin-loader' indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}/> :
        <div className="checkout-main-container">
        <div className='checkout-products-outer-container'>
            <div className='checkout-products-inner-container'>
            {cartData && cartData?.items.map((cartItem) => (
                        <div className='drawer-product'>
                        <img
                            src={cartItem?.imagesrc}
                            className="drawer-product-image"
                            alt="..."
                        />
                        <div className="">
                            <h6 className="long-word">{cartItem?.name}</h6>
                            <span>Qty: {cartItem?.quantity}</span>
                            {/* <span>{cartItem?.CartQuantity}</span> */}
                            <h6 className="">&#8377; {cartItem?.price * cartItem?.quantity}</h6>
                        </div>
                        </div>
                        
                    ))}
            </div>
            <span style={{ fontWeight: "bold" }}>{cartData?.items?.length > 0 ? <div className='checkout-Total-Products'>Total: &#8377; {cartData?.bill}</div> : <div>"You dont have any products in cart"</div>}</span>
        
        </div>
        
        <div className="my-form-outer-main-container">
            <h5>Checkout</h5>
            <div className="my-form-container">
                <form 
                onSubmit={handleCheckout}
                className='checkOutregisterForm'>

                <div className="fullName-container">
                    <span className='star-label'>Full name</span>
                    <div className="fullName-input">
                        <input type='text' name="fullName" placeholder='Enter full name' value={checkoutInputData.fullName} onChange={handleInputChange} required />
                    </div>
                </div>

                <div className="emailAddress-container">
                    <span className='star-label'>Email address</span>
                    <div className="emailAddress-input">
                        <input type='email' name="emailAddress" placeholder='Enter email address' value={checkoutInputData.emailAddress} onChange={handleInputChange} required />
                    </div>
                </div>

                <div className="phoneNumber-container">
                    <span className='star-label'>Phone number</span>
                    <div className="phoneNumber-input">
                        <input type='number' name="phoneNumber" placeholder='Enter phone number' value={checkoutInputData.phoneNumber} onChange={handleInputChange} required />
                    </div>
                </div>
                
                <div>
                    <span className='star-label'>Shipping address</span>
                    <div className='address-input'>
                        <input type='text' name="shippingAddress" placeholder='Enter shipping address' value={checkoutInputData.shippingAddress} onChange={handleInputChange} required />
                    </div>
                </div>
               
                <div className='address-secondary-container'>
                    <div className='city-container'>
                        <span className='star-label'>City</span>
                        <div className="city-input">
                            <input type='text' name="city" placeholder='Enter city' value={checkoutInputData.city} onChange={handleInputChange} required />
                        </div>   
                    </div>

                    <div className='state-container'>
                        <span className='star-label'>State</span>
                        <div className="state-input">
                            <input type='text' name="state" placeholder='Enter state' value={checkoutInputData.state} onChange={handleInputChange} required />
                        </div>  
                    </div>

                    <div className='zipCode-container'>
                        <span className='star-label'>ZIP Code</span>
                        <div className='zipcode-input'>
                            <input type='number' name="zipCode" placeholder='Enter zipcode' value={checkoutInputData.zipCode} onChange={handleInputChange} required />
                        </div>    
                    </div>
                </div>

                <div className='cardNumber-container'>
                    <span className='star-label'>Card number</span>
                    <div className="card-number-input">
                        <input type='number'  name="CardNumber" placeholder='Enter card number' value={checkoutInputData.CardNumber} onChange={handleInputChange} required/>
                    </div>  
                </div>

                {cartData?.items?.length > 0  ? <button className='btn btn-primary' type='submit'>Checkout</button> : ""}

                </form>
            </div>
        </div>

    </div>
    }
    <GoToTop />
    {/* <Footer /> */}
    <Footer2 />
    </>
  )
}

export default Checkout


