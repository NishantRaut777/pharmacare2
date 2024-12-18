import React, { useEffect } from 'react';
import "../styles/Header.css";
import { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
// import DrawerCustom from './Drawer';
import DrawerCustom from './Drawer';
// import 'react-modern-drawer/dist/index.css';
import { message, Spin } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { logOutSuccess, logOutStart, logOutFailure } from '../redux/user/userSlice';
import axios from 'axios';
import { makeCartEmpty } from '../redux/cart/cartSlice';
import medslogo from "../assets/meds24-logo.png";
import pharmacare from "../assets/pharmacare.png"
import { LoadingOutlined } from '@ant-design/icons';
import axiosInstance from '../api/axios';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cartActive, setCartActive] = useState(false);
  const { cartData } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, currentUser } = useSelector((state) => state.user);

  // const toggleDrawer = () => {
  //     setIsOpen((prevState) => !prevState);
  // }

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "../scripts/script.js";
  //   script.async = true;
  //   script.defer = true;
  //   document.body.appendChild(script);

  // }, []);

  const handleLogout = async() => {
    dispatch(logOutStart());
    try{
      const res = await axiosInstance.post("/api/user/logout");
      // const res = await axios.post("/api/user/login", values);
      localStorage.removeItem("jwtToken");
      dispatch(logOutSuccess());
      dispatch(makeCartEmpty());
      message.success("Logout Successfully");
      navigate("/");
    } catch(err){
      dispatch(logOutFailure(err));
    } 
  };

  // Handling search product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(); 
    urlParams.set("searchTerm", searchValue);
    

    const searchQuery = urlParams.toString();
    // console.log("URLPARAMS", searchQuery);
    const searchTerm = urlParams.get('searchTerm');

    // If search term is empty navigate to homepage
    if(searchTerm === ""){
      navigate("/");
    }else{
      navigate(`/productSearch?${searchQuery}`);
    }
    
  }

  return (
    <>
      <div className="header-main-container">
          <div className="logo-form-container">
            <Link className="company-name" to={"/"}>
              <img src={pharmacare} alt="" />
            </Link>
            <form className="" role="search" onSubmit={handleSubmit}>
              <input
                className=""
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {/* <Link to={`/productSearch`}> */}
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
              {/* </Link> */}
            </form>
          </div>

          <div className="login-register-uname">
            <Link to={"/"} className="ul-link" style={{ textDecoration: "none", color: "black" }}>
            <span style={{ cursor: "pointer" }}>{currentUser?.name}</span></Link>
            
            {/* If User is logged in then only show the cart */}
            {currentUser !== null ? (
              <div className="cart-container">
                <i
                  className="fa-solid fa-cart-shopping cart-icon"
                  style={{ cursor: "pointer" }}
                  // onClick={toggleDrawer}
                  onClick={() => setCartActive(!cartActive)}
                ></i>
                { cartData?.items?.length > 0 && <span className='cart-quantity'>{cartData?.items?.length}</span>}
                
              </div>
            ) : (
              ""
            )}

            { currentUser !== null ? (
              <span className="">
                    <Link
                      to={"/myorders"}
                      className="ul-link"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      MyOrders
                    </Link>
                  </span>
            ): ""
            }

            <ul className="">
              <li className="nav-item">
                {currentUser === null ? (
                  <button className="btn btn-success m-2">
                    <Link
                      to={"/login"}
                      className="ul-link"
                      style={{ color: "white" }}
                    >
                      Login
                    </Link>
                  </button>
                ) : (
                  <button className="btn btn-danger m-2" onClick={handleLogout}>
                    Logout
                  </button>
                )}
              </li>
              <li className="nav-item">
                {currentUser === null ? (
                  <button className="btn btn-secondary m-2">
                    <Link
                      to={"/register"}
                      className="ul-link"
                      style={{ color: "white" }}
                    >
                      Register
                    </Link>
                  </button>
                ) : (
                  ""
                )}
              </li>
            </ul>
            { cartActive ? 
              <DrawerCustom
              setCartActive = {setCartActive}
              // open={isOpen}
              // onClose={toggleDrawer}
              // direction="right"
              // size={500}
              // cart={cart}
            ></DrawerCustom>:
            ""
            }
            
          </div>
        </div>
    </>
  );
}

export default Header
