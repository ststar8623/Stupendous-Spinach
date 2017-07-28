import React, { Component } from 'react';
import Promise from 'bluebird';
import GoogleMapReact from 'google-map-react';
import Loading from '../Loading/Loading';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { urlAction } from '../../actions/urlAction';
import { imageAction, imageIsFetched, fetchPhotoFromRadius, mapPhotoIsFetched, selectPhotoFromRadius } from '../../actions/imageAction';
import { getLocation } from '../../actions/geoAction';

class GoogleMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.urlAction('googleMap');
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.location.isFetched) {
      this.props.getLocation();
    } else if (!nextProps.mapPhoto.isFetched) {
      return new Promise((resolve, reject) => {
        resolve(this.props.fetchPhotoFromRadius(10, { location: this.props.location }));
      }).then(() => {
        return this.props.imageAction({ location: this.props.location, max: 20 });
      }).then(() => {
        return this.props.imageIsFetched(true);
      }).then((data) => {
        return this.props.mapPhotoIsFetched(true);
      }).catch(error => console.log('error: ', error));
    }
  }

  selectedPhotoOnMap(i) {
    const { allPhotoFromRadius } = this.props.mapPhoto;
    this.props.selectPhotoFromRadius(allPhotoFromRadius[i].elements, i);
  }

  render() {
    const { latitude, longitude } = this.props.location;
    const { allPhotoFromRadius, isFetched } = this.props.mapPhoto;
    let currPosition = {
      center: {lat: latitude, lng: longitude},
      zoom: 13
    };
    const photoCard = allPhotoFromRadius.map((photo, i) => {
      const latitude = photo.centroid[0];
      const longitude = photo.centroid[1];
      const numberOfPhotos = photo.elements.length;
      return (
        <div key={i} lat={ latitude } lng={ longitude }>
          <div className="google-cluster-div">
            <Link to="selectPhotoFromMap" className='google-thumbnail' onClick={this.selectedPhotoOnMap.bind(this, i)}><span className="google-cluster">{ numberOfPhotos }</span></Link>
          </div>
        </div>
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
        <GoogleMapReact style={{ width: '100%', height: '80%' }} center={currPosition.center} zoom={currPosition.zoom} >
          { photoCard }
        </GoogleMapReact>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    mapPhoto: state.mapPhoto,
    photoArray: state.photoArray,
    location: state.location
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ imageAction, urlAction, imageIsFetched, getLocation, fetchPhotoFromRadius, mapPhotoIsFetched, selectPhotoFromRadius }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);
