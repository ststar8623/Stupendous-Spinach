import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { urlAction } from '../actions/urlAction';

class GoogleMap extends Component {
  componentWillMount() {
    this.props.urlAction('googleMap');
  }

  componentWillUnmount() {
    this.props.urlAction('nearby');
  }

  photoOnMap() {
    return this.props.photoArray.map((photo, i) => {
      return (
        <div key={i} lat={ photo.latitude } lng={ photo.longitude} text={ photo.first }>
          <img src={ photo.url } className='google-thumbnail'/>
        </div>
      )
    })
  }
  render() {
    const { latitude, longitude } = this.props.location;
    let currPosition = {
      center: {lat: latitude, lng: longitude},
      zoom: 15
    };
    return (
      <GoogleMapReact style={{ width: '100%', height: '80%' }} center={currPosition.center} zoom={currPosition.zoom}>
        { this.photoOnMap.bind(this)() }
      </GoogleMapReact>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location,
    photoArray: state.photoArray
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ urlAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);