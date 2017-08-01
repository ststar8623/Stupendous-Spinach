import React, {Component} from 'react';
import Promise from 'bluebird';
import { connect } from 'react-redux';
import { imageIsFetched } from '../actions/imageAction'; //Needed? YEAH //
import { captionedImageUpload, initialImageUpload } from '../helpers/imageUploadAction';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { urlAction } from '../actions/urlAction';
import Loading from './Loading/Loading';

class PreviewAndShare extends Component {
  constructor() {
    super();
    this.state = {
      shareSelection: 'everyone',
      captionText: '',
      uploading: false
    };
  }

  componentWillMount() {
    this.props.urlAction('share');
  }

  handleCaptionChange(e) {
    this.setState({
      captionText: e.target.value
    });
  }

  handleShareChange(e) {
    this.setState({
      shareSelection: e.target.value
    });
  }

  handleCaptionSubmit(e) {
    e.preventDefault();
    this.setState({
      uploading: true
    });
    return new Promise((resolve, reject) => {
      initialImageUpload(this.props.url, data => {
        resolve(data);
      });
    }).then(url => {
      return {
        location: this.props.location,
        url: url,
        caption: this.state.captionText,
        shareSelection: this.state.shareSelection
      };
    }).then(imageObj => {
      captionedImageUpload(imageObj, () => {
        this.props.imageIsFetched(false);
        browserHistory.push('/nearby');
      });
    }).catch(error => {
      console.log('error on upload ', error);
    });
  }

  render() {
    if (this.state.uploading) {
      return (
        <div>
          <Loading />
        </div>
      );
    } else {
      return (
        <div className="preview-share-comp">
          <div className="preview-div">
            <img src={this.props.url.preview} className='preview-image'/>
          </div>
          <div className="btn-group" data-toggle="buttons">
            <label className="btn btn-primary">
              <input type="radio" value="everyone" id="everyone" checked={this.state.shareSelection === 'everyone'} onChange={this.handleShareChange.bind(this)}autocomplete="off"/>Share with everyone
            </label>
            <label className="btn btn-primary">
              <input type="radio" value="friends" id="friends" checked={this.state.shareSelection === 'friends'} onChange={this.handleShareChange.bind(this)}autocomplete="off"/>Share with friends
            </label>
          </div>
          <form role="form" onSubmit={this.handleCaptionSubmit.bind(this)}className="comments-form">
            <div className="row">
              <div className="col-xs-12">
                <div className="input-group input-group-lg">
                  <input type="text" className="form-control input-lg" placeholder="Write a caption..." value={this.state.text} onChange={this.handleCaptionChange.bind(this)}/>
                  <span className="input-group-btn">
                    <button className="btn btn-default btn-lg" type="submit" onClick={this.handleCaptionSubmit.bind(this)}>Send</button>
                  </span>
                </div>
              </div>
            </div>
          </form>
          {/* <form className="comments-form" onSubmit={this.handleCaptionSubmit}>
            <input className="comments-input" type="text" placeholder="Add a caption..." onChange={this.handleCaptionChange} />
            <span className="comments-button glyphicon glyphicon-ok" type="submit" onClick={this.handleCaptionSubmit} ></span>
          </form> */}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.upload,
    location: state.location
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ imageIsFetched, urlAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewAndShare);
