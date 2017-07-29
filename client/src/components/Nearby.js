import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { connect } from 'react-redux';
import NearbyPhotoCard from './NearbyPhotoCard';
import Loading from './Loading/Loading';
import { Link } from 'react-router';
import { urlAction } from '../actions/urlAction';
import Promise from 'bluebird';

require('!style-loader!css-loader!sass-loader!../styles/main.scss');
require('!style-loader!css-loader!sass-loader!../styles/main.css');

class Nearby extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.urlAction('nearby');
  }

  lazyLoad() {
    // need an endpoint to grabs extra photos
  }

  render() {
    const isFetched = this.props.location.photoArrayIsFetched;
    const photoArray = this.props.photoArray.map((photo, i) => {
      return (
        <NearbyPhotoCard key={i} photo={photo} i={i} />
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
        <div className="photoCard-container container">
          <h4 className="h4-heading"> Nearby Photos </h4>
          { photoArray }
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
  return bindActionCreators({ urlAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Nearby);
