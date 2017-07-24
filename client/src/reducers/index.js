import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import posts from './posts';
import geo from './geo';
import photoArray from './photos';
import upload from './upload';
import currentPhoto from './currentPhoto';
import url from './url';

const rootReducer = combineReducers({ upload, currentPhoto, location: geo, photoArray, routing: routerReducer, url });

export default rootReducer;