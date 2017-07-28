import React, { Component } from 'react';
import { Link } from 'react-router';
import Camera from '../Camera';
import { connect } from 'react-redux';

require('../../styles/main.css');

class NavigationBar extends Component {
  render() {
    const { url } = this.props;
    const mapOpacity = url === 'googleMap' ? 'glyphicon glyphicon-record' : 'glyphicon glyphicon-record button-opacity';
    const nearbyOpacity = url === 'nearby' ? 'glyphicon glyphicon-map-marker' : 'glyphicon glyphicon-map-marker button-opacity';
    return (
      <nav className="navbar navbar-default navbar-fixed-bottom">
        <div className="container navbar-container">
          <Camera />
          <Link to="/"><span className={ nearbyOpacity } aria-hidden="true"></span></Link>
          <Link to="/googleMap"><span className={ mapOpacity } aria-hidden="true"></span></Link>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url
  };
};

export default connect(mapStateToProps)(NavigationBar);
