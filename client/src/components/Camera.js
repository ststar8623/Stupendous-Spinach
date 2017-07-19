import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { getLocation } from '../actions/geoAction';
import imageUpload from '../actions/imageUploadAction';

class Camera extends Component {
  componentWillMount() {
    this.props.getLocation();
  }

  onImageDrop(file) {
    imageUpload(file);
  }

  render() {
    return (
      <div>
        <Dropzone multiple={false} accept='image/*' onDrop={this.onImageDrop.bind(this)}></Dropzone>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {location: state.location};
};

export default connect(mapStateToProps, {getLocation})(Camera);