import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { viewProfile, getPhotosOfUser, profileIsFetched } from '../actions/profileAction';
import { urlAction } from '../actions/urlAction';
import Loading from './Loading/Loading';
import GoogleMapReact from 'google-map-react';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.urlAction('profile');
    let logedUser = parseInt(document.getElementById('userID').innerHTML);
    this.props.getPhotosOfUser(this.props.params.userId);
    this.props.viewProfile(this.props.params.userId);
  }

  componentWillUnmount() {
    this.props.urlAction('nearby');
    this.props.profileIsFetched(false);
  }
  
  selectedPhotoOnMap(i) {
    console.log('clicked--->', i);
  }

  render() {
    let currPosition = {
      center: {
        lat: this.props.location.latitude, 
        lng: this.props.location.longitude
      },
      zoom: 13
    };
    let { profilePhotos, profileInfo, profileIsFetched } = this.props.profile;
    if (profilePhotos) {
      var photosDiv = profilePhotos.map((photo, i)=>{
        return (
          <div key={i} lat={ photo.latitude } lng={ photo.longitude } >
            <img src={photo.url} className='test' onClick={this.selectedPhotoOnMap.bind(this, i)} />
          </div>
        );
      });
    }

    return (
      <div>
        { 
          profileIsFetched ? 
            <div>
              <div className='profile-profile'>
                <div className='round'>
                  <img className='profilePic' src={ profileInfo.profile.photo } /> 
                </div>
                <div className='text-center'>
                  <p> {profileInfo.profile.display} </p>
                  { profileInfo.isOwnProfile ? '' : <p className="btn btn-primary btn-xs">Follow</p> }
                  { profileInfo.isOwnProfile ? '' : <Link to='/chat'><p className="btn btn-primary btn-xs"> Message </p></Link>
                  }
                </div>
              </div>
              
              <div className='followDataContainer'>
                <div className='col-xs-4'> 
                  <div className='num text-center'> {profileInfo.profile.follower_count}</div>
                  <div className='letters text-center'> followers </div>
                </div>

                <div className='col-xs-4'> 
                  <div className='num text-center'> {profileInfo.profile.following_count}</div>
                  <div className='letters text-center'> following </div>
                </div>

                <div className='col-xs-4'> 
                  <div className='num text-center'> {profileInfo.profile.post_count}</div>
                  <div className='letters text-center'> posts </div>
                </div>
              </div>

              <div className='profileMap'>
                <GoogleMapReact center={currPosition.center} zoom={currPosition.zoom} >
                  {photosDiv}
                </GoogleMapReact>
              </div>
            </div>
          
            : <Loading />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    location: state.location,
    profile: state.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ urlAction, viewProfile, getPhotosOfUser, profileIsFetched }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);