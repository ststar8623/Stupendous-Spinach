import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import comments from './comments';
import geo from './geo';
import photoArray from './photos';
import upload from './upload';

const rootReducer = combineReducers({ posts, comments, upload, location: geo, photoArray, routing: routerReducer });

export default rootReducer;