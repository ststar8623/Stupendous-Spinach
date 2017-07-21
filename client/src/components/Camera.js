import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { getLocation } from '../actions/geoAction';
import imageUpload from '../helpers/imageUploadAction';
import { browserHistory } from 'react-router';
import { imageStoreAction } from '../actions/imageAction';
import { bindActionCreators } from 'redux';

class Camera extends Component {

  componentWillMount() {
    this.props.getLocation();
  }

  onImageDrop(file) {
    let that = this;
    imageUpload(file, this.props.location, data => {
      that.props.imageStoreAction(data);
      browserHistory.push('/PreviewAndShare'); 
    });
  }

  render() {
    return (
      <Dropzone multiple={false} accept='image/*' onDrop={this.onImageDrop.bind(this)} className="glyphicon glyphicon-camera" aria-hidden="true">
      </Dropzone>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location,
    url: state.upload
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getLocation, imageStoreAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);