import React, { Component } from 'react';
import Promise from 'bluebird';
import GoogleMapReact from 'google-map-react';
import Loading from '../Loading';
import { nearbyPhoto, mapPhotosWithRadius } from '../../helpers/axiosAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { urlAction } from '../../actions/urlAction';
import { imageAction, imageIsFetched, fetchPhotoFromRadius } from '../../actions/imageAction';
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
    this.props.imageIsFetched(false);
    if (!this.props.allPhotoFromRadius.length) {
      return new Promise((resolve, reject) => {
        resolve(this.props.getLocation());
      }).then(() => {
        return mapPhotosWithRadius(1, { location: this.props.location }, (res) => {
          this.props.fetchPhotoFromRadius(res.data);
          this.props.imageIsFetched(true);
        });
        if (!this.props.photoArray.length) {
          return nearbyPhoto({ location: this.props.location, max: 20 }, (res) => {
            this.props.imageAction(res.data);
          });
        }
      }).error((error) => console.log('error ', error));
    } else {
      this.props.imageIsFetched(true);
    }
  }

  componentWillUnmount() {
    this.props.urlAction('nearby');
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
    const { allPhotoFromRadius } = this.props;
    const isFetched = this.props.location.isFetched;
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
    location: state.location,
    allPhotoFromRadius: state.currentPhoto.allPhotoFromRadius,
    photoArray: state.photoArray
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ imageAction, urlAction, imageIsFetched, getLocation, fetchPhotoFromRadius }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);