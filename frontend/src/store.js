
import { configureStore ,applyMiddleware} from '@reduxjs/toolkit';
import {combineReducers} from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { userReducer } from './Reducers/userReducers';
import { allArtistReducer } from './Reducers/artistReducer';
import { allGenreReducer,createSong } from './Reducers/songReducer';
const reducers = combineReducers({
    user:userReducer,
    allArtist:allArtistReducer,
    allGenre:allGenreReducer,
    song:createSong
});

let intialState ={};

const middleware = [thunk];

const store = configureStore({reducer:reducers},intialState,composeWithDevTools, applyMiddleware(...middleware));

export default store