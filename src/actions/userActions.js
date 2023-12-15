import axios from "axios";
import Cookies from 'js-cookie';
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  DELETE_USER_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/userConstants.js";

//LOGIN
export const login =
  (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      console.log('Data Req before' , email , password);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `https://ecommerce-i8go.onrender.com/api/v1/login`,
        { email, password },
        config
      );
      console.log('Data response', data.token);

      localStorage.setItem("userToken", data?.token);
      Cookies.set("token", data?.token, { expires: 7, secure: false });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data?.user,
      });
    } catch (error) {
      console.log("User Action", error);
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response?.data?.message,
      });
    }
  };
// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    let link = `https://ecommerce-i8go.onrender.com/api/v1/register`;
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    console.log('User Data ', userData);
    const { data } = await axios.post(link, userData, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Load User
export const loadUser =
  () => async (dispatch) => {
    const token = Cookies.get("token");
    if (token) {
      console.log('Load User ' , token);
      try {
        dispatch({ type: LOAD_USER_REQUEST });
        const config = { 
          headers: { 
            "Content-Type": "application/json" ,
            "token" : token
          }
        }
        const { data } = await axios.post(
          `https://ecommerce-i8go.onrender.com/api/v1/me`,
          { token }
        );

        dispatch({
          type: LOAD_USER_SUCCESS,
          payload: data.data,
        });
        // console.log( 'Load User Done ', data);
      } catch (error) {
        console.log("User Action", error);
        dispatch({
          type: LOAD_USER_FAIL,
          payload: error.response.data.message,
        });
      }
    }
  };
//Logout User
export const logout =
  () => async (dispatch) => {
    console.log('Logout User ');
    try {
      // await axios.get(`http://localhost:4000/api/v1/logout`);
      localStorage.removeItem("userToken");
      Cookies.remove("token");
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } catch (error) {
      console.log("User Action", error);
      dispatch({
        type: LOGOUT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({
      type:
        UPDATE_PROFILE_REQUEST,
    });
    let link = `https://ecommerce-i8go.onrender.com/api/v1/me/update`;
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(link, userData, config);
    console.log('User Data----> ', data);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS, payload: data.success
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: Cookies.get("token"),
      },
    };
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(
      `https://ecommerce-i8go.onrender.com/api/v1/admin/users`,
      config
    );

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: Cookies.get("token"),
      },
    };
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(
      `https://ecommerce-i8go.onrender.com/api/v1/admin/user/${id}`,
      config
    );

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        token: Cookies.get("token"),
      },
    };

    const { data } = await axios.put(
      `https://ecommerce-i8go.onrender.com/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: Cookies.get("token"),
      },
    };
    const { data } = await axios.delete(
      `https://ecommerce-i8go.onrender.com/api/v1/admin/user/${id}`,
      config
    );
      console.log('Data Deleted ' , data.message)
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data?.message,
    });
  }
};
//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
