import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
// import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// import the root reducer
import rootReducer from './reducers/index';

// create an object for the default data
// let defaultState = localStorage.redux || {};
const defaultState = {}; //blank default state

// Redux dev tools installation
// Install redux dev tools from chrome
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
  // , persistState() // save state of store
);

// promise middleware
function promiseMiddleware({dispatch}) {
  function isPromise(val) {
    return val && typeof val.then === 'function';
  };
  return next => action => {
    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result}),
          error => dispatch({...action, payload: error, error: true })
        )
      : next(action);
  };
}

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk)(createStore);

const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

export default createStoreWithMiddleware(rootReducer, defaultState, enhancers);
