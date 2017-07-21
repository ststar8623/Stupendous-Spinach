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
  componentWillMount() {
    this.props.getLocation();
  }

  render() {
    return (
      <div>
        <NavigationBarTop />
        <NavigationBarBottom />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getLocation }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);