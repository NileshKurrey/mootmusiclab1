import {ALL_ARTIST_REQUEST,ALL_ARTIST_SUCCESS,ALL_ARTIST_FAIL,CLEAR_ERRORS} from '../constants/artistConstants'
  
import axios from "axios";
export const getAllArtist = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_ARTIST_REQUEST });
      const { data } = await axios.get(`/api/v1/getAllartist`);
      dispatch({ type: ALL_ARTIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ALL_ARTIST_FAIL, payload: error.response.data.message });
    }
  };

  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };