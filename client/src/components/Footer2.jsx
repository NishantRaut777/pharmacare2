import React from 'react'
import "../styles/Footer2.css";

const Footer2 = ({ isBottom }) => {
  return (
    <div className="footer-2-container" style={ isBottom ? { position: "fixed", bottom: "0px", width: "100%" }: {}} >
        <span>&#169; 2024 pharmacare</span>
    </div>
  )
}

export default Footer2
