
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { userReducer, profileReducer, allUsersReducer, userDetailsReducer } from './Reducers/userReducers';
import { allArtistReducer } from './Reducers/artistReducer';
import { allGenreReducer, createSong } from './Reducers/songReducer';
import { selectedSongReducer } from './Reducers/selectSongReducer';
const reducers = combineReducers({
    user: userReducer,
    allArtist: allArtistReducer,
    allGenre: allGenreReducer,
    profile: profileReducer,
    song: createSong,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    currentSong: selectedSongReducer
});

let intialState = {};

const middleware = [thunk];

const store = configureStore({ reducer: reducers }, intialState, composeWithDevTools, applyMiddleware(...middleware));

export default store