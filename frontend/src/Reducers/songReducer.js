import { ALL_GENRE_REQUESTED, ALL_GENRE_FAIL, ALL_GENRE_SUCCESS, CREATE_SONG_FAIL, CREATE_SONG_SUCCESS, CREATE_SONG_REQUEST, CLEAR_ERRORS, GET_RECENT_SONG_REQUEST, GET_RECENT_SONG_SUCCESS, GET_RECENT_SONG_FAIL, DELETE_SONG_REQUEST, DELETE_SONG_SUCCESS, DELETE_SONG_FAIL, ALL_SONG_REQUEST, ALL_SONG_SUCCESS, ALL_SONG_FAIL } from '../constants/songConstants'
export const allGenreReducer = (state = { genre: [] }, action) => {
  switch (action.type) {
    case ALL_GENRE_REQUESTED:
      return {
        ...state,
        loading: true,
        genre: []
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

export const createSong = (state = { song: {} }, action) => {
  switch (action.type) {
    case CREATE_SONG_REQUEST:
    case DELETE_SONG_REQUEST:
      return {
        ...state,
        loading: true,

      };
    case CREATE_SONG_SUCCESS:
    case DELETE_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        song: action.payload,
      };

    case CREATE_SONG_FAIL:
    case DELETE_SONG_FAIL:
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
export const getSongs = (state = { song: [] }, action) => {
  switch (action.type) {
    case GET_RECENT_SONG_REQUEST:
    case  ALL_SONG_REQUEST:
      return {
        ...state,
        loading: true,

      };
    case GET_RECENT_SONG_SUCCESS:
    case ALL_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        songs: action.payload,
      };

    case GET_RECENT_SONG_FAIL:
    case ALL_SONG_FAIL:
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