import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const options = { 
    value: product.ratings,
    isHalf: true,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        
      </div>
      <div className="productCardSpan">
          ( {product.numOfReviews} Reviews )
      </div>
      <span>₹{product.price}</span>
    </Link>
  );
};

export default ProductCard;

// ctrl + alt + 4 => ₹
