import React from 'react';
import {Link} from "react-router-dom";
import "../styles/Product.css";

const Product = ({productkey, productid, imagesrc, name, price, rating, hasMargin}) => {
  const marginStyle = {
    marginBottom: "20px"
  };

  return (
    <Link to={`/product/${productid}`} className="product-card-level-link" style={hasMargin && marginStyle}>
      <div className="card product-card" style={{ width: "12rem", border: "none" }} key={productkey}>
        <img
          src={imagesrc}
          className="card-img-top product-image"
          alt="..."
        />
        <div className="card-body product-inner-info">
          {/* <h5 className="card-title">{name}</h5> */}
          <p className='product-card-product-name'>{name}</p>
          <span>{rating} <i class="fa-solid fa-star" style={{ color: "#FFD43B"}}></i></span>
          <h5 className="card-title product-price">&#8377; {price}</h5>
          <Link to={`/product/${productid}`} className="my-link buy-product-btn btn btn-success">
              Buy
          </Link>
          
        </div>
      </div>
    </Link>
  );
}

export default Product
