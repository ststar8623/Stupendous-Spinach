import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import comments from './comments';
import geo from './geo';
import photoArray from './photos';

const rootReducer = combineReducers({ posts, comments, location: geo, photo: photoArray, routing: routerReducer });

export default rootReducer;