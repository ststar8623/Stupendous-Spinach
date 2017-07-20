import React, { Component } from 'react';
import NearbyPhotoCard from './NearbyPhotoCard';
import photoData from '../data/photoData';
import axios from 'axios';
import { getLocation } from '../actions/geoAction';

class NearBy extends Component {

	data() {
		// axios.post('/api/nearbyPhotos', {
  //   firstName: 'Fred',
  //   lastName: 'Flintstone'
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
  	console.log('location------>')
	}
  render() {
    return (
      <div>

      {this.data()}
      // map through each photo, 
      //give it to NearbyPhotoCard 
      //NearbyPhotoCard 
      
      </div>
    );
  }
}

export default NearBy;