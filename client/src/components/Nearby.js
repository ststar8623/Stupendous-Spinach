import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { connect } from 'react-redux';
import NearbyPhotoCard from './NearbyPhotoCard';
import Loading from './Loading';
import { imageAction, imageIsFetched, fetchPhotoFromRadius, mapPhotoIsFetched } from '../actions/imageAction';
import { Link } from 'react-router';
import { nearbyPhoto, mapPhotosWithRadius } from '../helpers/axiosAction';
import { urlAction } from '../actions/urlAction';
import Promise from 'bluebird';
import { getLocation } from '../actions/geoAction';


require('!style-loader!css-loader!sass-loader!../styles/main.scss');
require('!style-loader!css-loader!sass-loader!../styles/main.css');

class Nearby extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.props.urlAction('nearby');
    return new Promise((resolve, reject) => {
      resolve(this.props.getLocation());
    }).then(() => {
      return nearbyPhoto({ location: this.props.location, max: 20 }, (res) => {
        this.props.imageAction(res.data);
      });
    }).then(() => {
      this.props.imageIsFetched(true);
    }).then(() => {
      return mapPhotosWithRadius(0.2, { location: this.props.location }, (res) => {
        this.props.fetchPhotoFromRadius(res.data);
      });
    }).then(() => {
      this.props.mapPhotoIsFetched(true);
    }).error(error => {
      console.log('error: ', error);
    });
  }
 
  renderPhotos() {
    return this.props.photoArray.map((photo, i) => {
      return (
        <NearbyPhotoCard key={i} photo={photo} i={i}/>
      );
    });
  }
  render() {
    const isFetched = this.props.location.isFetched;
    if (!isFetched) {
      return (
        <div>
          <Loading />
        </div>
      );
    } else {
      return (
        <div className="photoCard-container container">
          <h4 className="h4-heading"> Nearby Photos </h4>
          {this.renderPhotos.bind(this)()} 
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location,
    photoArray: state.photoArray,
    url: state.url,
    allPhotoFromRadius: state.mapPhoto.allPhotoFromRadius
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ imageAction, imageIsFetched, urlAction, fetchPhotoFromRadius, getLocation, mapPhotoIsFetched }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Nearby);
