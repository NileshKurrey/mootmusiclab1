import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    CLEAR_ERRORS,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
  } from "../constants/userContants";
  
  import axios from "axios";
  
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(
        `/api/v1/login`,
        { email, password },
        config
      );
  
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
      
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };
  
  export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.post(`/api/v1/register`, userData, config);
  
      dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    console.log('Getting My data requested',dispatch({ type: LOAD_USER_REQUEST }))
    const { data } = await axios.get(`/api/v1/me`);
    
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    console.log('Getting My data success',dispatch({ type: LOAD_USER_SUCCESS, payload: data.user }))
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    console.log(dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message }))
  }
};


  //Logout User
  export const logout = () => async (dispatch) => {
    try {
      await axios.get(`/api/v1/logout`);
  
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });

    }
  };

  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };