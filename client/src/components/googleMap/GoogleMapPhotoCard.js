import React, { Component } from 'react';
import { urlAction } from '../../actions/urlAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class GoogleMapPhotoCard extends Component {
  componentWillMount() {
    this.props.urlAction('googleMapPhotoCard');
  }

  render() {
    const photoCard = this.props.somePhotoFromRadius.map((photo, i) => {
      return (
        <div key={i} className="photoCard-div">
          <img className="mapPhotoCard" src={ photo[2].url } alt="..." />
        </div>
      );
    });
    return (
      <div className="mapPhotoCard-container">
        { photoCard }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    somePhotoFromRadius: state.mapPhoto.somePhotoFromRadius
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ urlAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapPhotoCard);