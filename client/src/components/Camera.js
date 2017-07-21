import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import * as AllActions from '../actions/geoAction';
import imageUpload from '../actions/imageUploadAction';
import { browserHistory } from 'react-router';
import { imageStoreAction } from '../actions/imageAction';
import { bindActionCreators } from 'redux';

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
    let that = this;
    imageUpload(file, this.props.location, data => {
      // this.setState({
      //   uploadedPhoto: data
      // }, () => {
      //   console.log('state: ', this.state);
      // });
      console.log('Camera this.props: =============> ' , that.props);
      that.props.imageStoreAction(data);
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
  return {
    location: state.location,
    url: state.upload
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(AllActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);