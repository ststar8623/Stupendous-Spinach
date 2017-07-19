import React from 'react';
import { render } from 'react-dom';

// import css
// import css from './styles/style.styl';

// import components
import App from './components/App';
// import Single from './components/Single';
// import PhotoGrid from './components/PhotoGrid'; 
import Camera from './components/Camera';
import NearBy from './components/NearBy';
import CommentsAndLikes from './components/CommentsAndLikes';

// import react router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={NearBy} />
        <Route path='/nearby' component={NearBy} />
        <Route path='/commentsAndLikes' component={CommentsAndLikes} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));