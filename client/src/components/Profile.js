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
    this.state = {
      url: null,
      isMyProfile: null,
      display: null,
      following: 151,
      followers: 67,
      posts: 25
    };
    //this.props.params.userId
    this.props.viewProfile(this.props.params.userId, (profile)=> {
      this.setState({
        url: profile.profile.photo,
        isMyProfile: profile.isOwnProfile,
        display: profile.profile.display
      });
    });
  }

  componentWillMount() {
    this.props.urlAction('profile');
  }

  componentWillUnmount() {
    this.props.urlAction('nearby');
  }

  render() {
    return (
      <div>
        <div className='profile-profile'>
          <div className='round'>
            <img className='profilePic' src={ this.state.url } /> 
          </div>
          <div className='text-center'>
            <p> {this.state.display} </p>
            <p className="btn btn-primary btn-xs">Follow</p>
          </div>
        </div>
        

        <div className='followDataContainer'>
          <div className='col-xs-4'> 
            <div className='num text-center'> {this.state.followers}</div>
            <div className='letters text-center'> followers </div>
          </div>

          <div className='col-xs-4'> 
            <div className='num text-center'> {this.state.following}</div>
            <div className='letters text-center'> following </div>
          </div>

          <div className='col-xs-4'> 
            <div className='num text-center'> {this.state.posts}</div>
            <div className='letters text-center'> posts </div>
          </div>
        </div>

        <div className='profileMap'>
          this is map in profile
          the size should be fixd

        </div> 


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