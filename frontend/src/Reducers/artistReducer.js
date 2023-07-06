import {ALL_ARTIST_REQUEST,ALL_ARTIST_SUCCESS,ALL_ARTIST_FAIL,CLEAR_ERRORS} from '../constants/artistConstants'
export const allArtistReducer = (state = { artists: [] }, action) => {
    switch (action.type) {
      case ALL_ARTIST_REQUEST:
        return {
          ...state,
          loading: true,
          artist:[]
        };
      case ALL_ARTIST_SUCCESS:
        return {
          ...state,
          loading: false,
          artists: action.payload.artists,
        };
  
      case ALL_ARTIST_FAIL:
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
