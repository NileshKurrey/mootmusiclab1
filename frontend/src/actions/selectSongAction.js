import {SET_SONGS,SELECT_SONG}from '../constants/songConstants'
  // Define action creators
  export const setSongs = (songs) => ({
    type: SET_SONGS,
    payload: songs,
  });
  
  export const selectSong = (song) => ({
    type: SELECT_SONG,
    payload: song,
  });

  