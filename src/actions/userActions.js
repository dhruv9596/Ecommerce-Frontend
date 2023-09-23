import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/userConstants.js";
export const login =
  (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      let link = `http://localhost:4000/api/v1/login`;
      const config = { headers : { "Content Type" : "application/json"}}
      const { data } = await axios.post(link , {email , password }, config );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("Product Action Error", error);
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };
// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    let link = `http://localhost:4000/api/v1/register`;
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(link, userData, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
