import React, { Component } from 'react';
import Promise from 'bluebird';
import GoogleMapReact from 'google-map-react';
import Loading from '../Loading';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { urlAction } from '../../actions/urlAction';
import { imageAction, imageIsFetched, fetchPhotoFromRadius, mapPhotoIsFetched } from '../../actions/imageAction';
import { getLocation } from '../../actions/geoAction';

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIsClicked: false,
      url: null
    };
  }

  componentWillMount() {
    this.props.urlAction('googleMap');
    if (!this.props.location.isFetched || !this.props.mapPhoto.isFetched) {
      Promise.resolve(this.props.getLocation())
        .then(() => {
          return this.props.fetchPhotoFromRadius(0.5, { location: this.props.location });
        }).then(() => {
          return this.props.imageAction({ location: this.props.location, max: 20 });
        }).then(() => {
          return this.props.mapPhotoIsFetched(true);
        }).error((error) => console.log('error ', error));
    }
  }

  enLargePhoto(url) {
    url = url || null;
    this.setState({
      imageIsClicked: !this.state.imageIsClicked,
      url: url
    });
  }

  render() {
    const { latitude, longitude } = this.props.location;
    const { allPhotoFromRadius, isFetched } = this.props.mapPhoto;
    const isImageClicked = !this.state.imageIsClicked ? 'hidden-image' : 'show-image';
    let currPosition = {
      center: {lat: latitude, lng: longitude},
      zoom: 16
    };
    const photoCard = allPhotoFromRadius.map((photo, i) => {
      const { latitude, longitude, url } = photo;
      return (
        <div key={i} lat={ latitude } lng={ longitude } onClick={this.enLargePhoto.bind(this, url)} >
          <img src={ url } className='google-thumbnail' />
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
          <div className="show-image-div">
            <img src={ this.state.url } className={ isImageClicked } onClick={this.enLargePhoto.bind(this)} />
          </div>
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
  return bindActionCreators({ imageAction, urlAction, imageIsFetched, getLocation, fetchPhotoFromRadius, mapPhotoIsFetched }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);