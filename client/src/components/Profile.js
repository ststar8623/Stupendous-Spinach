import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currentPhotoAction, currentIsFetched } from '../actions/imageAction';
import { incrementComment, decrementComment, viewProfile, getPhotosOfUser } from '../actions/likeAction';
import { urlAction } from '../actions/urlAction';
import Loading from './Loading/Loading';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router';

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
        display: profile.profile.display,
        followers: profile.profile.follower_count,
        following: profile.profile.following_count
      });
    });
  }

  componentWillMount() {
    this.props.urlAction('profile');
    let logedUser = parseInt(document.getElementById('userID').innerHTML);
    this.props.getPhotosOfUser(logedUser);
  }

  componentWillUnmount() {
    this.props.urlAction('nearby');
  }
  selectedPhotoOnMap(i) {
    console.log('clicked--->', i);

  }

  render() {
    // <img src={photo.url} className='test'/>
    let currPosition = {
      center: {lat: 37.7837141, lng: -122.4090657},
      zoom: 11
    };
    var photos = this.props.mapPhoto.onePhotoFromRadius;

    console.log('map photos', this.props.mapPhoto);
    if (photos) {
      var latitudeObj = {};
      var photosDiv = photos.map((photo, i)=>{
        let latitude = photo.latitude;
        latitudeObj[latitude] ? latitudeObj[latitude] = latitude : '';
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
          this.state.url ? 
            <div>
              <div className='profile-profile'>
                <div className='round'>
                  <img className='profilePic' src={ this.state.url } /> 
                </div>
                <div className='text-center'>
                  <p> {this.state.display} </p>
                  { this.state.isMyProfile ? '' : <p className="btn btn-primary btn-xs">Follow</p> }
                  { this.state.isMyProfile ? '' : <Link to="/chat"><p className="btn btn-primary btn-xs">Message</p></Link>}
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
                <GoogleMapReact center={currPosition.center} zoom={13} >
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
    photoArray: state.photoArray,
    currentPhoto: state.currentPhoto.current,
    isFetched: state.currentPhoto.isFetched,
    url: state.url,
    mapPhoto: state.mapPhoto
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ currentPhotoAction, incrementComment, decrementComment, currentIsFetched, urlAction, viewProfile, getPhotosOfUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);