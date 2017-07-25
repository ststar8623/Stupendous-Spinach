import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Loading from '../Loading';
import { axiosAction } from '../../helpers/axiosAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { urlAction } from '../../actions/urlAction';
import { imageAction, imageIsFetched } from '../../actions/imageAction';
import { getLocation } from '../../actions/geoAction';
import Promise from 'bluebird';

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
    if (!this.props.photoArray.length) {
      return new Promise((resolve, reject) => {
        resolve(this.props.getLocation());
      }).then(() => {
        return axiosAction('post', '/api/nearbyPhotos', { location: this.props.location }, (response) => {
          this.props.imageAction(response.data);
          this.props.imageIsFetched(true);
        });
      });
    } else {
      this.props.imageIsFetched(true);
    }

  }

  componentWillUnmount() {
    this.props.urlAction('nearby');
  }

  enLargePhoto(url) {
    this.setState({
      imageIsClicked: !this.state.imageIsClicked,
      url: url
    });
  }

  render() {
    const { latitude, longitude } = this.props.location;
    const { photoArray } = this.props;
    const isFetched = this.props.location.isFetched;
    const isImageClicked = !this.state.imageIsClicked ? 'hidden-image' : 'show-image';
    let currPosition = {
      center: {lat: latitude, lng: longitude},
      zoom: 16
    };
    const photoCard = photoArray.map((photo, i) => {
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
          <img src={ this.state.url } className={ isImageClicked } />
        </GoogleMapReact>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location,
    photoArray: state.photoArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ urlAction, imageAction, imageIsFetched, getLocation }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);