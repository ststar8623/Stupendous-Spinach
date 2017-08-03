import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import { imageIsFetched } from '../../actions/imageAction';
// import store from '../../store';
// import { firstLoad } from '../../helpers/firstLoad';

class NavigationBarTop extends Component {
  componentWillMount() {
    this.state = {
      userID: `/user/${this.props.myId}`
    };
  }
  refreshButton() {
    this.props.imageIsFetched(false);
  }

  goBackButton() {
    const backToWhere = this.props.url === 'googleMapPhotoCard' ? '/googleMap' : this.props.url === 'chat' ? `/user/${this.props.userId}` : '/';
    browserHistory.push(backToWhere); 
  }

  render() {
    const url = this.props.url;
    const refreshOrBackButton = url === 'nearby' ? 'glyphicon fa fa-spinner floatLeft' : 'glyphicon glyphicon-arrow-left floatLeft';
    const refreshOrBackFunction = url === 'nearby' ? this.refreshButton.bind(this) : this.goBackButton.bind(this);
    const flashBackOrComments = url === 'comments' ? 'Comments' : url === 'share' ? 'Share Photo' : url === 'googleMap' ? 'Map' : url === 'chat' ? 'Messages' : url === 'profile' ? 'Profile' : 'flashBack';
    return (
      <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header floatCenter">
            <span className={ refreshOrBackButton } aria-hidden="true" onClick={ refreshOrBackFunction }></span>
            <span className="flashback-title">{ flashBackOrComments }</span>
            <Link to={this.state.userID}><span className="glyphicon fa fa-user floatRight" aria-hidden="true"></span></Link>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    name: state,
    userId: state.profile.profileId,
    myId: state.profile.myId
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ imageIsFetched }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBarTop);
