import {ALL_GENRE_REQUESTED,ALL_GENRE_FAIL,ALL_GENRE_SUCCESS,CREATE_SONG_FAIL,CREATE_SONG_SUCCESS,CREATE_SONG_REQUEST,CLEAR_ERRORS} from '../constants/songConstants'
export const allGenreReducer = (state = { genre: [] }, action) => {
    switch (action.type) {
      case ALL_GENRE_REQUESTED:
        return {
          ...state,
          loading: true,
          genre:[]
        };
      case ALL_GENRE_SUCCESS:
        return {
          ...state,
          loading: false,
          genre: action.payload.genre,
        };
  
      case ALL_GENRE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

export const createSong =(state = {song:{}},action)=>{
  switch (action.type) {
    case CREATE_SONG_REQUEST:
      return {
        ...state,
        loading: true,

      };
    case CREATE_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        song: action.payload,
      };

    case CREATE_SONG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}