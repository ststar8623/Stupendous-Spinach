import React, { Component } from 'react';
import { urlAction } from '../../actions/urlAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectOnePhotoFromRadius } from '../../actions/imageAction';

class GoogleMapPhotoCard extends Component {
  componentWillMount() {
    this.props.urlAction('googleMapPhotoCard');
  }

  enLargePhoto(photo) {
    this.props.selectOnePhotoFromRadius(photo);
  }

  render() {
    const { somePhotoFromRadius, onePhotoFromRadius } = this.props.mapPhoto;
    const blurOrNot = onePhotoFromRadius ? 'mapPhotoCard blurPhoto' : 'mapPhotoCard';
    const photoCard = somePhotoFromRadius.map((photo, i) => {
      return (
        <div key={i} className="photoCard-div">
          <img className={ blurOrNot } src={ photo[2].url } alt="..." onClick={this.enLargePhoto.bind(this, photo[2])} />
        </div>
      );
    });
    const singlePhotoIsClicked = onePhotoFromRadius ? 'show-image-div' : 'hidden-image';
    const enLargePhoto = onePhotoFromRadius ? (
      <div>
        <img className={ singlePhotoIsClicked } src={ onePhotoFromRadius.url } onClick={this.enLargePhoto.bind(this, null)} />
      </div>
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