import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { imageIsFetched } from '../../actions/imageAction';

require('../../styles/main.css');

class NavigationBarTop extends Component {
  refreshButton() {
    this.props.imageIsFetched(false);
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container navbar-container">
          <span className="refresh-button glyphicon glyphicon-refresh" aria-hidden="true" onClick={this.refreshButton.bind(this)}></span>
          <h1 className="title"> flashBack </h1>
          <span className="user-button glyphicon glyphicon-user" aria-hidden="true"></span>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ imageIsFetched }, dispatch);
};

export default connect(null, mapDispatchToProps)(NavigationBarTop);