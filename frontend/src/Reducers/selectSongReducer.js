import {SET_SONGS,SELECT_SONG}from '../constants/songConstants'

// Define initial state
const initialState = {
    songs: [],
    currentSong: null,
  };


  // Define reducer function
export const selectedSongReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SONGS:
        return {
          ...state,
          songs: action.payload,
        };
      case SELECT_SONG:
        return {
          ...state,
          currentSong: action.payload,
        };
      default:
        return state;
    }
  };