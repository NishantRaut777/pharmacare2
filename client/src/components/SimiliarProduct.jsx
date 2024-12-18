import React from 'react'
import {Link} from "react-router-dom";
import "../styles/SimilarProduct.css";

const SimiliarProduct = ({productkey, productid, imagesrc, name, price, rating, hasMargin}) => {
    const marginStyle = {
        marginBottom: "20px"
      };
    
  return (
    <Link to={`/product/${productid}`} className="similiar-product-card-level-link" style={hasMargin && marginStyle}>
      <div className="similiar-card similiar-product-card" style={{ border: "none" }} key={productkey}>
        <img
          src={imagesrc}
          className="similiar-card-img-top similiar-product-image"
          alt="..."
        />
        <div className="similiar-card-body similiar-product-inner-info">
          {/* <h5 className="card-title">{name}</h5> */}
          <p className='similiar-product-card-product-name'>{name}</p>
          <span>{rating} <i class="fa-solid fa-star" style={{ color: "#FFD43B"}}></i></span>
          <h5 className="similiar-card-price">&#8377; {price}</h5>
          <Link to={`/product/${productid}`} className="similiar-my-link similiar-buy-product-btn btn btn-success">
              Buy
          </Link>
          
        </div>
      </div>
    </Link>
  )
}

export default SimiliarProduct
