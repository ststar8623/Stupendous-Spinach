import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currentPhotoAction, currentIsFetched } from '../actions/imageAction';
import { incrementComment, decrementComment, viewProfile } from '../actions/likeAction';
import { urlAction } from '../actions/urlAction';
import Loading from './Loading';


class Profile extends Component {
  constructor(props) {
    super(props);
    //this.props.params.userId
    this.props.viewProfile(this.props.params.userId, (profile)=> {
      console.log('constructor', profile);


    });

  }


  render() {
    return (
      <div>
        I am the profile
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    photoArray: state.photoArray,
    currentPhoto: state.currentPhoto.current,
    isFetched: state.currentPhoto.isFetched,
    url: state.url
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ currentPhotoAction, incrementComment, decrementComment, currentIsFetched, urlAction, viewProfile }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);