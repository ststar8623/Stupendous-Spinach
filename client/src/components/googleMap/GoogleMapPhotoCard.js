import React, { Component } from 'react';
import { urlAction } from '../../actions/urlAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectOnePhotoFromRadius } from '../../actions/imageAction';
import NearbyPhotoCard from '../NearbyPhotoCard';

class GoogleMapPhotoCard extends Component {
  componentWillMount() {
    this.props.urlAction('googleMapPhotoCard');
  }

  enLargePhoto(photo) {
    this.props.selectOnePhotoFromRadius(photo);
  }

  componentWillUnmount() {
    this.props.selectOnePhotoFromRadius(null);
  }

  render() {
    const { somePhotoFromRadius, onePhotoFromRadius, currentSelectedIndex } = this.props.mapPhoto;
    const blurOrNot = onePhotoFromRadius ? 'mapPhotoCard blurPhoto' : 'mapPhotoCard';
    const photoCard = somePhotoFromRadius.map((photo, i) => {
      return (
        <div key={i} className="photoCard-div">
          <img className={ blurOrNot } src={ photo[2].url } alt="..." onClick={this.enLargePhoto.bind(this, photo[2])} />
        </div>
      );
    });
    const enLargePhoto = onePhotoFromRadius ? (
      <NearbyPhotoCard photo={ onePhotoFromRadius } i={ currentSelectedIndex } />
    ) : '';

    return (
      <div className="mapPhotoCard-container">
        { photoCard }
        { enLargePhoto }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mapPhoto: state.mapPhoto
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ urlAction, selectOnePhotoFromRadius }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapPhotoCard);