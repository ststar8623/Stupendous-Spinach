import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { imageIsFetched } from '../../actions/imageAction';

require('../../styles/main.css');

class NavigationBarTop extends Component {
  refreshButton() {
    this.props.imageIsFetched(false);
  }

  goBackButton() {
    browserHistory.push('/'); 
  }

  render() {
    const url = this.props.url;
    const refreshOrBackButton = url === 'comments' || url === 'share' || url === 'googleMap' ? 'refresh-button glyphicon glyphicon-arrow-left' : 'refresh-button glyphicon glyphicon-refresh';
    const refreshOrBackFunction = url === 'comments' || url === 'share' || url === 'googleMap' ? this.goBackButton.bind(this) : this.refreshButton.bind(this);
    const flashBackOrComments = url === 'comments' ? 'Comments' : url === 'share' ? 'Share Photo' : url === 'googleMap' ? 'Map' : 'flashBack';
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container navbar-container">
          <span className={ refreshOrBackButton } aria-hidden="true" onClick={ refreshOrBackFunction }></span>
          <h1 className="title">{ flashBackOrComments }</h1>
          <span className="user-button glyphicon glyphicon-user" aria-hidden="true"></span>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ imageIsFetched }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBarTop);
