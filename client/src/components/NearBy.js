import React, { Component } from 'react';
import NearbyPhotoCard from './NearbyPhotoCard';
import photoData from '../data/photoData';
import axios from 'axios';
import { getLocation } from '../actions/geoAction';
import { connect } from 'react-redux';


class NearBy extends Component {

	data() {
	
		let	location = {
			latitude: this.props.location
		}

	
		axios.post('/api/nearbyPhotos', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  console.log('location------>');
	}
  render() {
  	console.log('--->',JSON.stringify(this.props.location));  
    return (
      <div>

     		Is this working?
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		location: state.location
	}
}


export default connect(mapStateToProps, {getLocation})(NearBy);