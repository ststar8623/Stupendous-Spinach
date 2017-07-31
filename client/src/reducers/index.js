import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import location from './location';
import photoArray from './photos';
import upload from './upload';
import currentPhoto from './currentPhoto';
import url from './url';
import mapPhoto from './mapPhoto';
import messages from './messages';
import profile from './profile';

const rootReducer = combineReducers({ upload, currentPhoto, location, photoArray, url, mapPhoto, messages, profile, routing: routerReducer });

export default rootReducer;