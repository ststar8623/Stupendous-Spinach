import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { connect } from 'react-redux';
import NearbyPhotoCard from './NearbyPhotoCard';
import Loading from './Loading';
import { imageAction, imageIsFetched } from '../actions/imageAction';
import { Link } from 'react-router';
import { axiosAction } from '../helpers/axiosAction';

require('!style-loader!css-loader!sass-loader!../styles/main.scss');
require('!style-loader!css-loader!sass-loader!../styles/main.css');

class Nearby extends Component {
  constructor(props) {
    super(props);
  }
  componentWillUpdate(nextProps) {
    if (!nextProps.location.isFetched) {
      axiosAction('post', '/api/nearbyPhotos', { location: nextProps.location }, (response) => {
        this.props.imageAction(response.data);
        this.props.imageIsFetched(true);
      });
    }
  }
 
  renderPhotos() {
    return this.props.photoArray.map((photo, i) => {
      return (
        <NearbyPhotoCard key={i} photo={photo} />
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
          <h4> Nearby Photos </h4>
          {this.renderPhotos.bind(this)()} 
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location,
    photoArray: state.photoArray.photoArray
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ imageAction, imageIsFetched }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Nearby);
