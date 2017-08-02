import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currentPhotoAction } from '../actions/imageAction';
import { viewProfile, getPhotosOfUser } from '../actions/likeAction';
import { urlAction } from '../actions/urlAction';
import Loading from './Loading/Loading';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router';
import Carousel from './Carousel';
import { setUserId, setUserProfile } from '../actions/profileAction';

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

  }
  selectedPhotoOnMap(i) {
    this.setState ({
      index: i
    });
    this.changeMapViewStat(false);
  }

  changeMapViewStat(state) {
    this.setState ({
      mapView: state
    });
  }

  render() {
    let currPosition = {
      center: {lat: this.props.location.latitude, lng: this.props.location.longitude},
      zoom: 13
    };
    var photos = this.props.mapPhoto.onePhotoFromRadius;

    if (photos) {

      var latitudeObj = {};
      var isFetched = true;
      var photosDiv = photos.map((photo, i)=>{
        let latitude = photo.latitude;
        latitudeObj[latitude] ? latitudeObj[latitude] = latitude : '';
        return (
          <div key={i} lat={ photo.latitude } lng={ photo.longitude } >
            <img src={photo.url} className='profileMapPhoto' onClick={this.selectedPhotoOnMap.bind(this, i) } />
          </div>
        );
      });
    }

    return (
      <div>
        { 
          this.state.url ? 
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

              <div className='profileMap'>
                {this.state.mapView ? 
                  <GoogleMapReact center={currPosition.center} zoom={currPosition.zoom} >
                    {photosDiv}
                  </GoogleMapReact>
                  : <Carousel mapView={this.changeMapViewStat.bind(this)} photos={photos} index={this.state.index} /> 
                }
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
    mapPhoto: state.mapPhoto,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ currentPhotoAction, urlAction, viewProfile, getPhotosOfUser,setUserId, setUserProfile }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
