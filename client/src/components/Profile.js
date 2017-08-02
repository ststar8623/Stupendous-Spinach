import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currentPhotoAction } from '../actions/imageAction';
import { viewProfile, getPhotosOfUser, oneUserPhotoIsFetched } from '../actions/imageAction';
import { urlAction } from '../actions/urlAction';
import Loading from './Loading/Loading';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router';
import Carousel from './Carousel';
import { setUserId, setUserProfile } from '../actions/profileAction';
import LazyLoad from 'react-lazyload';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      isMyProfile: null,
      display: null,
      following: 151,
      followers: 67,
      posts: 25,
      isFetched: false,
      mapView: true,
      index: null,
      userId: null
    };
    this.props.viewProfile(this.props.params.userId, (profile)=> {
      this.setState({
        url: profile.profile.photo,
        isMyProfile: profile.isOwnProfile,
        display: profile.profile.display,
        followers: profile.profile.follower_count,
        following: profile.profile.following_count,
        userId: profile.profile.id
      }, ()=>{
        this.props.setUserProfile(this.state.url, this.state.display);
        this.props.getPhotosOfUser(this.state.userId);
      });
      this.props.setUserId(profile.profile.id);
    });
  }

  componentWillMount() {
    this.props.urlAction('profile');
  }

  componentWillUnmount() {
    this.props.urlAction('nearby');
    this.props.oneUserPhotoIsFetched(false);
  }
  selectedPhotoOnMap(i) {
    this.setState ({
      index: i,
      mapView: !this.state.mapView
    });
  }

  render() {
    let currPosition = {
      center: {lat: this.props.location.latitude, lng: this.props.location.longitude},
      zoom: 13
    };
    let { allPhotoFromUser } = this.props.mapPhoto;

    let photos = allPhotoFromUser.map((photo, i) => {
      return (
        <LazyLoad height={50} key={i} className="photoCard-div col-xs-12 col-md-6 col-lg-3">
          <img className="mapPhotoCard" src={ photo.url }/>
        </LazyLoad>
      );
    });

    return (
      this.props.mapPhoto.oneUserPhotoIsFetched ? 
        <div className="profile-component">
          <div className='profile-profile'>
            <div className='round'>
              <img className='profilePic' src={ this.state.url } /> 
            </div>
            <div className='text-center'>
              <p> {this.state.display} </p>
              { this.state.isMyProfile ? '' : <p className="btn btn-primary btn-xs">Follow</p> }
              { this.state.isMyProfile ? '' : <Link to="/chat"><p className="btn btn-primary btn-xs">Message</p></Link>}
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
          </div>
          <div className="container">
            <div className="row">
              <div className="mapPhotoCard-profile-container col-xs-12">
                { photos }
              </div>
            </div>
          </div>
        </div>
        : <Loading />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    mapPhoto: state.mapPhoto,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ currentPhotoAction, urlAction, viewProfile, getPhotosOfUser, setUserId, setUserProfile, oneUserPhotoIsFetched }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
