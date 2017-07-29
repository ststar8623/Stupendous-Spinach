import React from 'react';
import { render } from 'react-dom';
import Promise from 'bluebird';

// import components
import Main from './components/Main';
import Camera from './components/Camera';
import Nearby from './components/Nearby';
import Comments from './components/Comments';
import PreviewAndShare from './components/PreviewAndShare';
import GoogleMap from './components/googleMap/GoogleMap';
import GoogleMapPhotoCard from './components/googleMap/GoogleMapPhotoCard';
import Profile from './components/Profile';
import Chat from './components/Chat';

import { getLocation } from './actions/geoAction';
import { imageAction, imageIsFetched, fetchPhotoFromRadius, mapPhotoIsFetched } from './actions/imageAction';

// import react router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

store.dispatch((dispatch) => {
  // console.log('store ', store.getState());
  return new Promise((resolve, reject) => {
    resolve(dispatch(getLocation()));
  }).then(() => {
    return dispatch(imageAction({ location: store.getState().location, max: 20 }));
  }).then(() => {
    return dispatch(fetchPhotoFromRadius(50, { location: store.getState().location }));
  }).then(() => {
    return dispatch(imageIsFetched(true));
  }).then((data) => {
    return dispatch(mapPhotoIsFetched(true));
  }).catch(error => console.log('error: ', error));
});

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Main}>
        <IndexRoute component={Nearby} />
        <Route path='/nearby' component={Nearby} />
        <Route path='/comments/:postId/:index' component={Comments} />
        <Route path='/PreviewAndShare' component={PreviewAndShare} />
        <Route path='/googleMap' component={GoogleMap} />
        <Route path='/selectPhotoFromMap' component={GoogleMapPhotoCard} />
        <Route path='/user/:userId' component={Profile} />
        <Route path='/chat' component={Chat} /> 
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));