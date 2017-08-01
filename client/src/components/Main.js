import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLocation } from '../actions/geoAction';
import Nearby from './Nearby';

import NavigationBarBottom from './navigation/navBottom';
import NavigationBarTop from './navigation/navTop';

class Main extends Component {
  render() {
    const displayBottomNav = this.props.url === 'comments' || this.props.url === 'share' || this.props.url === 'googleMap' || this.props.url === 'chat' ? '' : <NavigationBarBottom />;

    return (
      <div className="container-fluid">
        <NavigationBarTop />
        { this.props.children }
        { displayBottomNav }
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
