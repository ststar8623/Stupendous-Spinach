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
import Chat from './components/chatting/Chat';
import Rooms from './components/chatting/Rooms';

// import react router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

import { firstLoad } from './helpers/firstLoad';
import { imageAction } from './actions/imageAction';

store.dispatch(() => {
  firstLoad;
});

console.log(store);

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
        <Route path='/rooms' component={Rooms} />
        <Route path='/chat' component={Chat} /> 
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));