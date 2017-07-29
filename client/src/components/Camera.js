import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { getLocation } from '../actions/geoAction';
import { browserHistory } from 'react-router';
import { urlUploadAction } from '../actions/urlAction';
import { bindActionCreators } from 'redux';

class Camera extends Component {
  onImageDrop(file) {
    this.props.urlUploadAction(file[0]);
    browserHistory.push('/PreviewAndShare');
  }

  render() {
    return (
      <Dropzone className="glyphicon glyphicon-camera button-opacity" aria-hidden="true" multiple={false} accept='image/*' onDrop={this.onImageDrop.bind(this)} >
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

// multiple={false} accept='image/*' onDrop={this.onImageDrop.bind(this)} 