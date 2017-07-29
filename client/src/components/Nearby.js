import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { connect } from 'react-redux';
import NearbyPhotoCard from './NearbyPhotoCard';
import Loading from './Loading/Loading';
import { imageAction, imageIsFetched, fetchPhotoFromRadius, mapPhotoIsFetched } from '../actions/imageAction';
import { Link } from 'react-router';
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
  }
  
  componentWillUpdate(nextProps) {
    if (!nextProps.location.isFetched) {
      this.props.getLocation();
    } else if (!nextProps.location.photoArrayIsFetched) {
      return new Promise((resolve, reject) => {
        resolve(this.props.imageAction({ location: this.props.location, max: 20 }));
      }).then(() => {
        return this.props.fetchPhotoFromRadius(50, { location: this.props.location });
      }).then(() => {
        return this.props.imageIsFetched(true);
      }).then((data) => {
        return this.props.mapPhotoIsFetched(true);
      }).catch(error => console.log('error: ', error));
    }
  }
 
  renderPhotos() {
    return this.props.photoArray.map((photo, i) => {
      return (
        <NearbyPhotoCard key={i} photo={photo} i={i}/>
      );
    });
  }
  render() {
    const isFetched = this.props.location.photoArrayIsFetched;
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
