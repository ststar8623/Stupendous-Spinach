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
    console.log('this.props: ', this.props);
    imageUpload(file, this.props.location);
  }

  render() {
    return (
      <Dropzone multiple={false} accept='image/*' onDrop={this.onImageDrop.bind(this)} className="fa fa-camera-retro col-sm-4 text-center" aria-hidden="true" >
      </Dropzone>
    );
  }
}

const mapStateToProps = (state) => {
  return {location: state.location};
};

export default connect(mapStateToProps, {getLocation})(Camera);