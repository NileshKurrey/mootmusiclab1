import {ALL_GENRE_REQUESTED,ALL_GENRE_FAIL,ALL_GENRE_SUCCESS,CREATE_SONG_FAIL,CREATE_SONG_SUCCESS,CREATE_SONG_REQUEST,CLEAR_ERRORS} from '../constants/songConstants'
import axios from "axios";
export const getAllGenre = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_GENRE_REQUESTED });
      const { data } = await axios.get(`/api/v1/getAllGenre`);
      dispatch({ type: ALL_GENRE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ALL_GENRE_FAIL, payload: error.response.data.message });
    }
  };


export const createSong = (songData) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_SONG_REQUEST });
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(`/api/v1/createSong`,songData,config);
      console.log(data)
      dispatch({ type: CREATE_SONG_SUCCESS, payload: data.song });
    } catch (error) {
      dispatch({ type: CREATE_SONG_FAIL, payload: error.response.data.message });
    }
  };

  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };