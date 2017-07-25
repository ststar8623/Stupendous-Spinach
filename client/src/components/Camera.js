import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { getLocation } from '../actions/geoAction';
import { initialImageUpload } from '../helpers/imageUploadAction';
import { browserHistory } from 'react-router';
import { urlUploadAction } from '../actions/urlAction';
import { bindActionCreators } from 'redux';

class Camera extends Component {

  componentWillMount() {
    this.props.getLocation();
  }

  onImageDrop(file) {
    let that = this;
    initialImageUpload(file, data => {
      that.props.urlUploadAction(data);
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
  return bindActionCreators({ getLocation, urlUploadAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);