import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import pharmacare from "../assets/pharmacare.png";
import "../styles/Header2.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import DrawerCustom from "./Drawer";
import {
  logOutSuccess,
  logOutStart,
  logOutFailure,
} from "../redux/user/userSlice";
import axios from "axios";
import { makeCartEmpty } from "../redux/cart/cartSlice";
import { message, Spin } from "antd";
import Hamburger from "hamburger-react";
import axiosInstance from "../api/axios";

const Header2 = () => {
  const { loading, currentUser } = useSelector((state) => state.user);
  const [cartActive, setCartActive] = useState(false);
  const { cartData } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const [isMenuOpen, setOpen] = useState(false);

  const handleLogout = async () => {
    dispatch(logOutStart());
    try {
      const res = await axiosInstance.post("/api/user/logout");
      // const res = await axios.post("/api/user/login", values);
      localStorage.removeItem("jwtToken");
      dispatch(logOutSuccess());
      dispatch(makeCartEmpty());
      message.success("Logout Successfully");
      navigate("/");
    } catch (err) {
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
    const searchTerm = urlParams.get("searchTerm");

    // If search term is empty navigate to homepage
    if (searchTerm === "") {
      navigate("/");
    } else {
      navigate(`/productSearch?${searchQuery}`);
    }
  };

  return (
    <div className="header-main-container-2">
      <div className={`mobile-hamburger-container ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              Home
            </Link>
          </li>

          <li>
            {currentUser != null ? (
              <Link
                to={"/mycart"}
                style={{ textDecoration: "none", color: "black" }}
              >
                My Cart
              </Link>
            ) : (
              ""
            )}
          </li>

          <li>
            {currentUser !== null ? (
              <span className="">
                <Link
                  to={"/myorders"}
                  className="ul-link"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  My Orders
                </Link>
              </span>
            ) : (
              ""
            )}
          </li>

          <li>
            {currentUser === null ? (
              <Link to={"/login"} className="login-btn-hamburger">
                Login
              </Link>
            ) : (
              <button className="logout-btn-hamburger" onClick={handleLogout}>
                Logout
              </button>
            )}
          </li>

          <li>
            {currentUser === null ? (
              <Link to={"/register"} className="register-btn-hamburger">
                Register
              </Link>
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>

      <div className="header-logo-pharmacare">
        <Link className="company-name" to={"/"}>
          <img src={pharmacare} alt="" />
        </Link>
      </div>

      <div className="header-search-container">
        <form className="" role="search" onSubmit={handleSubmit}>
          <input
            className=""
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="header-cart-container">
        <Link
          to={"/"}
          className="ul-link"
          style={{ textDecoration: "none", color: "black" }}
        >
          <span style={{ cursor: "pointer" }}>{currentUser?.name}</span>
        </Link>

        {currentUser != null ? (
          <Link
            to={"/myorders"}
            className="ul-link"
            style={{ textDecoration: "none", color: "black" }}
          >
            <span style={{ cursor: "pointer" }}>My Orders</span>
          </Link>
        ) : (
          ""
        )}

        {currentUser !== null ? (
          <div className="cart-container">
            <Link
              to={"/mycart"}
              className="ul-link"
              style={{ textDecoration: "none", color: "black" }}
            >
              <i
                className="fa-solid fa-cart-shopping cart-icon-header2"
                style={{ cursor: "pointer" }}
                onClick={() => setCartActive(!cartActive)}
              ></i>
            </Link>

            {cartData?.items?.length > 0 && (
              <span className="cart-quantity">{cartData?.items?.length}</span>
            )}
          </div>
        ) : (
          ""
        )}

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
      </div>

      <div className="hamburger-class">
        <Hamburger toggled={isMenuOpen} toggle={setOpen} size={20} />
      </div>
    </div>
  );
};

export default Header2;
