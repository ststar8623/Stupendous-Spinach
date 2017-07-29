import React from 'react';
import { render } from 'react-dom';

// import css
// import css from './styles/style.styl';

// import components
import Main from './components/Main';
// import Single from './components/Single';
// import PhotoGrid from './components/PhotoGrid'; 
import Camera from './components/Camera';
import Nearby from './components/Nearby';
import Comments from './components/Comments';
import PreviewAndShare from './components/PreviewAndShare';
import GoogleMap from './components/googleMap/GoogleMap';
import GoogleMapPhotoCard from './components/googleMap/GoogleMapPhotoCard';
import Profile from './components/Profile';
import Chat from './components/Chat';

// import react router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

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