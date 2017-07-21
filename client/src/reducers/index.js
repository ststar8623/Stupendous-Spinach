import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import comments from './comments';
import geo from './geo';
import photoArray from './photos';
import upload from './upload';
import currentPhoto from './currentPhoto';

const rootReducer = combineReducers({ posts, comments, upload, currentPhoto, location: geo, photoArray, routing: routerReducer });

export default rootReducer;