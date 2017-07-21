import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { getLocation } from '../actions/geoAction';
import imageUpload from '../actions/imageUploadAction';
import { browserHistory } from 'react-router';

class Camera extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     uploadedPhoto: null
  //   };
  // }

  componentWillMount() {
    this.props.getLocation();
  }

  onImageDrop(file) {
    console.log('Camera this.props: ' , this.props);
    imageUpload(file, this.props.location, data => {
      this.setState({
        uploadedPhoto: data
      }, () => {
        console.log('state: ', this.state);
      });
      browserHistory.push('/PreviewAndShare'); 
    });
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