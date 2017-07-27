import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import { imageIsFetched } from '../../actions/imageAction';

require('../../styles/main.css');

class NavigationBarTop extends Component {
  componentWillMount() {
    this.state = {
      userID: `/user/ ${parseInt(document.getElementById('userID').innerHTML)}`
    };
  }
  refreshButton() {
    this.props.imageIsFetched(false);
  }

  goBackButton() {
    const backToWhere = this.props.url === 'googleMapPhotoCard' ? '/googleMap' : '/';
    browserHistory.push(backToWhere); 
  }

  render() {
    const url = this.props.url;
    const refreshOrBackButton = url === 'comments' || url === 'share' || url === 'googleMap' || url === 'profile' ? 'refresh-button glyphicon glyphicon-arrow-left' : 'refresh-button glyphicon glyphicon-refresh';
    const refreshOrBackFunction = url === 'comments' || url === 'share' || url === 'googleMap' || url === 'profile' ? this.goBackButton.bind(this) : this.refreshButton.bind(this);
    const flashBackOrComments = url === 'comments' ? 'Comments' : url === 'share' ? 'Share Photo' : url === 'googleMap' ? 'Map' : url === 'profile' ? 'Profile' : 'flashBack';
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container navbar-container">
          <span className={ refreshOrBackButton } aria-hidden="true" onClick={ refreshOrBackFunction }></span>
          <h1 className="title">{ flashBackOrComments }</h1>
          <Link to={this.state.userID}><span className="user-button glyphicon glyphicon-user" aria-hidden="true"></span></Link>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    name: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ imageIsFetched }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBarTop);
