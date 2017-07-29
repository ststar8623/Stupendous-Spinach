import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import { imageIsFetched } from '../../actions/imageAction';

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
    const refreshOrBackButton = url === 'nearby' ? 'refresh-button glyphicon glyphicon-refresh' : 'refresh-button glyphicon glyphicon-arrow-left';
    const refreshOrBackFunction = url === 'nearby' ? this.refreshButton.bind(this) : this.goBackButton.bind(this);
    const flashBackOrComments = url === 'comments' ? 'Comments' : url === 'share' ? 'Share Photo' : url === 'googleMap' ? 'Map' : 'flashBack';
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
