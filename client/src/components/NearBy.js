import React, { Component } from 'react';
import NearbyPhotoCard from './NearbyPhotoCard';
import photoData from '../data/photoData';
import axios from 'axios';
import { getLocation } from '../actions/geoAction';
import { connect } from 'react-redux';


class NearBy extends Component {

  // componentWillMount() {



  //   axios.post('/api/nearbyPhotos', this.props.location)
  //     .then(function (response) {
  //       console.log('response: ', response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  renderPhotos() {
    return photoData.map(photo => 
      <NearbyPhotoCard key={photo.caption} photo={photo} /> 
    );
  }
  render() {
    return (
      <div>
        <h1> Nearby Photos </h1>
        {this.renderPhotos()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location
  };
};


export default connect(mapStateToProps, {getLocation})(NearBy);