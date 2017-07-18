import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import NavigationBar from './NavigationBar';
import Camera from './Camera';
import { getLocation } from '../actions/geoAction';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(__dirname + '../service-worker.js')
      .then(() => {
        console.log('Service Worker Registered');
      });
  });
}

class Main extends Component {
  componentWillMount() {
    this.props.getLocation();
  }
  render() {
    return (
      <div className="container">
        <NavigationBar />
        <h1>
          flashback
        </h1>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {location: state.location};
};

export default connect(mapStateToProps, {getLocation})(Main);