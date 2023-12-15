import axios from "axios";
import Cookies from "js-cookie";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants.js";
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 500000], category , ratings = 0  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      //console.log('Keyword in Actions' , keyword);
      let link = `https://ecommerce-i8go.onrender.com/api/v1/products/${keyword}?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;


      if( category ) {
        link = `https://ecommerce-i8go.onrender.com/api/v1/products/${keyword}?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      const { data } = await axios.get(link);
      console.log( 'Data in PA ' , data);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("Product Action Error", error);
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response?.data?.message,
      });
    }
  };
export const getProductDetails = (id) => async (dispatch) => {
  try {
    console.log('G p D ');
    dispatch({ type: PRODUCT_DETAILS_REQUEST });  
    const { data } = await axios.get(
      `https://ecommerce-i8go.onrender.com/api/v1/product/${id}`
    );
    console.log("Data", data.product);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    console.log("Product Action Error", error);
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get All Products for Admin

export const getAdminProduct = () => async (dispatch) => {

    try {
      dispatch({ type : ADMIN_PRODUCT_REQUEST});
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
      };
      const { data } = await axios.get(
        "https://ecommerce-i8go.onrender.com/api/v1/admin/products",
        config
      );
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
    } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//NEW Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const config = {
      headers : {
        "Content-Type" : "application/json",
        token: Cookies.get("token"),
      },
    }
    const { data } = await axios.post(
      "https://ecommerce-i8go.onrender.com/api/v1/admin/product/new",
      productData,
      config
    );
    console.log("Data", data.product);
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Update Product
export const updateProduct = (id , productData) => async (dispatch) => {
  try {
    console.log('Product Update Data '  , productData);
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const config = {
      headers : {
        "Content-Type" : "application/json",
        token: Cookies.get("token"),
      },
    }
    const { data } = await axios.put(
      `https://ecommerce-i8go.onrender.com/api/v1/admin/product/${id}`,
      productData,
      config
    );
    console.log("Data", data.product);
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
//DELETE Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: Cookies.get("token"),
      },
    };
    const { data } = await axios.delete(
      `https://ecommerce-i8go.onrender.com/api/v1/admin/product/${id}`,
      config
    );
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
    console.log('Data Deleted ? ' , data.success);
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
//NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers : {
        "Content-Type" : "application/json",
        token: Cookies.get("token"),
      },
    }
    const { data } = await axios.put(
      "https://ecommerce-i8go.onrender.com/api/v1/review",
      reviewData,
      config
    );
    console.log("Data", data.product);
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(
      `https://ecommerce-i8go.onrender.com/api/v1/reviews?id=${id}`
    );

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: Cookies.get("token"),
      },
    };
    console.log('Product Action ' , reviewId , productId);
    const { data } = await axios.delete(
      `https://ecommerce-i8go.onrender.com/api/v1/reviews?id=${reviewId}&productId=${productId}`,
      config
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};



//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
