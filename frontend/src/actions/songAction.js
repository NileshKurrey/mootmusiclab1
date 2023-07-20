import {ALL_GENRE_REQUESTED,ALL_GENRE_FAIL,ALL_GENRE_SUCCESS,CREATE_SONG_FAIL,CREATE_SONG_SUCCESS,CREATE_SONG_REQUEST,CLEAR_ERRORS,GET_RECENT_SONG_REQUEST,GET_RECENT_SONG_SUCCESS,GET_RECENT_SONG_FAIL,DELETE_SONG_REQUEST,DELETE_SONG_SUCCESS,DELETE_SONG_FAIL,ALL_SONG_REQUEST,ALL_SONG_SUCCESS,ALL_SONG_FAIL} from '../constants/songConstants'
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
      dispatch({ type: CREATE_SONG_SUCCESS, payload: data.song });
    } catch (error) {
      dispatch({ type: CREATE_SONG_FAIL, payload: error.response.data.message });
    }
  };

  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };


  //GET recent song
export const getRecentSong = () => async (dispatch) => {
    try {
      dispatch({ type: GET_RECENT_SONG_REQUEST });
      const { data } = await axios.get(`/api/v1/recentSongs`);
      console.log(data)
      dispatch({ type: GET_RECENT_SONG_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_RECENT_SONG_FAIL, payload: error.response.data.message });
    }
  };
  //Delete a song
  export const deleteSong = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_SONG_REQUEST });
      const { data } = await axios.delete(`/api/v1//deleteSong/${id}`);
      dispatch({ type: DELETE_SONG_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: DELETE_SONG_FAIL, payload: error.response.data.message });
    }
  };


  //GET recent song
export const getAllSongs = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SONG_REQUEST });
    const { data } = await axios.get(`/api/v1/recentSongs`);
    console.log(data)
    dispatch({ type: ALL_SONG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_SONG_FAIL, payload: error.response.data.message });
  }
};