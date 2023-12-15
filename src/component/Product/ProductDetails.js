import React, { Fragment, useEffect , useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productActions";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/loader.js";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItemsToCart } from "../../actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Rating } from "@mui/material";
import { newReview } from "../../actions/productActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants.js";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );


  const { success , error : reviewError } = useSelector((state) => state.newReview);
  const { id } = useParams();
  console.log("Id ", id);
  useEffect(() => {
    if( error ){
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch( clearErrors());
    }   
    if( reviewError ){
      toast.error(reviewError, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch( clearErrors());
    }  
    if (success) {
      toast.success("Review Submitted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch( { type : NEW_REVIEW_RESET});
    }
    dispatch(getProductDetails(id));
  }, [dispatch,error , id , success , reviewError]);

  const [comment , setComment] = useState("");
  const [open , setOpen] = useState(false);
  const [rating , setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const increaseQuantity = () => {
    // console.log("Product S  " + product.stock + " Q " + quantity);
    let stock = product.stock;
    if ( stock <= quantity) {
      // console.log("Producttt " , product.stock);
      return;
    };

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
   const addToCartHandler = () => {
     dispatch(addItemsToCart(id, quantity));
     toast.success("Item Added To Cart", {
       position: toast.POSITION.TOP_RIGHT,
     });
   };
   const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
   }
   const reviewSubmitHandler = () => {
      const myForm = new FormData();
      myForm.set("rating" , rating);
      myForm.set("comment" , comment);
      myForm.set("productId" , id);
      dispatch(newReview(myForm));
      setOpen(false);
   }
  const options = {
    size: "large",
    value: product && Object.keys(product).length > 0 && product.ratings,
    isHalf: true,
    readOnly : true,
    precision : 0.5
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData />
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
                    <Rating {...options} />
                    <span>({product?.numOfReviews} Reviews)</span>
                  </div>
                  <div className="detailsBlock-3">
                    <h1>{`₹${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                      <div className="detailsBlock-3-1-1">
                        <button onClick={decreaseQuantity}>-</button>
                        <input readOnly type="number" value={quantity} />
                        <button onClick={increaseQuantity}>+</button>
                      </div>
                      <button
                        disabled={product.Stock < 1 ? true : false}
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </button>
                    </div>
                    <p>
                      Status :{" "}
                      <b
                        className={
                          product.Stock < 1 ? "redColor" : "greenColor"
                        }
                      >
                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                      </b>
                    </p>
                  </div>
                  <div className="detailsBlock-4">
                    Description : <p>{product.description}</p>
                  </div>
                  <button onClick={submitReviewToggle} className="submitReview">
                    Submit Review
                  </button>
                </div>
              )}
            </div>

            {product && Object.keys(product).length > 0 && (
              <div>
                <h3 className="reviewsHeading">Reviews</h3>
                <Dialog
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  onClose={submitReviewToggle}
                >
                  <DialogTitle>Submit Review</DialogTitle>
                  <DialogContent className="submitDialog">
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                      size="large"
                    />
                    <textarea
                      className="submitDialogTextArea"
                      cols="30"
                      rows="5"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                      Cancel
                    </Button>
                    <Button color="primary" onClick={reviewSubmitHandler}>
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
