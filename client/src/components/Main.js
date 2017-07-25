import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLocation } from '../actions/geoAction';

import NavigationBarBottom from './navigation/navBottom';
import NavigationBarTop from './navigation/navTop';

if ('serviceWorker' in navigator) {
  // window.addEventListener('load', () => {
  navigator.serviceWorker.register(__dirname + '../service-worker.js')
    .then(() => {
      console.log('Service Worker Registered');
    });
  // });
}

class Main extends Component {
  render() {
    const displayBottomNav = this.props.url === 'nearby' ? <NavigationBarBottom /> : '';

    return (
      <div>
        <NavigationBarTop />
        { displayBottomNav }
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location,
    url: state.url
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getLocation }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);