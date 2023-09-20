import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productActions";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/loader.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { id } = useParams();
  console.log("Id ", id);
  useEffect(() => {
    if( error ){
      toast.error("Error", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch( clearErrors());
    }   
    console.log("Toast ", toast.error);
    dispatch(getProductDetails(id));
  }, [id]);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product && Object.keys(product).length > 0 && product.ratings,
    isHalf: true,
  };

  return (
    <Fragment>
    
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="ProductDetails">
            <div className="div1">
              <Carousel>
                {product &&
                  Object.keys(product).length > 0 &&
                  product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CaroselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            {product && Object.keys(product).length > 0 && (
              <div className="div2">
                <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                  <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                  <ReactStars {...options} />
                  <span>({product.numOfReviews} Reviews)</span>
                </div>
                <div className="detailsBlock-3">
                  <h1>{`₹${product.price}`}</h1>
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button>-</button>
                      <input value="1" type="number" />
                      <button>+</button>
                    </div>
                    <button>Add to Cart</button>
                  </div>
                  <p>
                    Status :{" "}
                    <b
                      className={product.Stock < 1 ? "redColor" : "greenColor"}
                    >
                      {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>
                <div className="detailsBlock-4">
                  Description : <p>{product.description}</p>
                </div>
                <button className="submitReview">Submit Review</button>
              </div>
            )}
          </div>

          {product && Object.keys(product).length > 0 && (
            <div>
              <h3 className="reviewsHeading">Reviews</h3>
              {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                  {product.reviews &&
                    Object.keys(product.reviews).length > 0 &&
                    product.reviews.map((review) => (
                      <ReviewCard review={review} />
                    ))}
                </div>
              ) : (
                <p className="noReviews">No Reviews Yet</p>
              )}
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
