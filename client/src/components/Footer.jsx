import React from 'react';
import "../styles/Footer.css";
import medslogo from "../assets/pharmacare.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Footer = ({ isBottom }) => {
  const bottomStyle = {
    position: "absolute",
    width: "100%",
    bottom: 1,
    right: 1,
    zIndex: -1
  };
  return (
    // <div className='footer-container' style={isBottom && bottomStyle}>
    //   <marquee behavior="scroll" direction="right">All Rights Reserved.</marquee>
    // </div>
    <div className='footer-container' style={isBottom ? bottomStyle: {}}>
      <div className="footer-inner-container-1">
      <div className='img-container'>
            <Link className="company-name" to={"/"}>
              <img src={medslogo} alt="" />
            </Link>
      </div>
      
      <div className="footer-information-container">
      <div className='quick-links-container'>
        <h5>Quick Links</h5>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>FAQ</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className='get-in-touch-container'>
        <h5>Get in touch</h5>
        <p>703/A, Landsend Bldg., Lokhandwala Complex  Andheri (W),  Mumbai, India</p>
        <p>admin@pharmacare.com</p>
        <p>(02) 4202 6445</p>
      </div>
      </div>
      
      </div>
      
      <div className='footer-inner-container-2'>
        <hr />
        <span>&#169; 2024 pharmacare</span>
      </div>
    </div>
  )
}

export default Footer
