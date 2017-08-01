import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LazyLoad from 'react-lazyload';
import Promise from 'bluebird';
import axios from 'axios';
import NearbyPhotoCard from './NearbyPhotoCard';
import Loading from './Loading/Loading';
import { urlAction } from '../actions/urlAction';
import { getLocation } from '../actions/geoAction';
import { imageAction, imageIsFetched, fetchPhotoFromRadius, mapPhotoIsFetched } from '../actions/imageAction';

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
        resolve(this.props.imageAction({ location: this.props.location, max: 100 }));
      }).then(() => {
        return this.props.imageIsFetched(true);
      }).catch(error => console.log('error: ', error));
    }
  }

  render() {
    const isFetched = this.props.location.photoArrayIsFetched;
    const photoArray = this.props.photoArray.map((photo, i) => {
      return (
        <LazyLoad height={200} key={i}>
          <NearbyPhotoCard photo={photo} i={i} />
        </LazyLoad>
      );
    });
    if (!isFetched) {
      return (
        <div>
          <Loading />
        </div>
      );
    } else {
      return (
        <div className="container nearbyComponent">
          <div className="row">
            <div className="col-xs-12 img-rounded">
              <h4 className="h4-heading"> Nearby Photos </h4>
              { photoArray }
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    photoArray: state.photoArray,
    url: state.url,
    location: state.location
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ urlAction, getLocation, imageAction, imageIsFetched, fetchPhotoFromRadius, mapPhotoIsFetched }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Nearby);
