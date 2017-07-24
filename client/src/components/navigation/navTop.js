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
    browserHistory.push('/nearby'); 
  }

  render() {
    const refreshOrBackButton = this.props.url === 'comments' ? 'refresh-button glyphicon glyphicon-arrow-left' : 'refresh-button glyphicon glyphicon-refresh';
    const refreshOrBackFunction = this.props.url === 'comments' ? this.goBackButton.bind(this) : this.refreshButton.bind(this);
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container navbar-container">
          <span className={ refreshOrBackButton } aria-hidden="true" onClick={ refreshOrBackFunction }></span>
          <h1 className="title"> flashBack </h1>
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