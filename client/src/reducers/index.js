import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import comments from './comments';
import geo from './geo';

const rootReducer = combineReducers({ posts, comments, location: geo, routing: routerReducer });

export default rootReducer;