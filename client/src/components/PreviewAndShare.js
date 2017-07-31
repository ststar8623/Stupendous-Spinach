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
  
    this.handleCaptionSubmit = this.handleCaptionSubmit.bind(this);
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleShareChange = this.handleShareChange.bind(this);
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
          <ul className="preview-share-ul">
            <li><input type="radio" name="share-selection" value="everyone" onChange={this.handleShareChange} checked={this.state.shareSelection === 'everyone'} /><span>Share with everyone</span></li>
            <li><input type="radio" name="share-selection" value="friends" onChange={this.handleShareChange} checked={this.state.shareSelection === 'friends'} /><span>Share with friends only</span></li>
          </ul>
          <form className="comments-form" onSubmit={this.handleCaptionSubmit}>
            <input className="comments-input" type="text" placeholder="Add a caption..." onChange={this.handleCaptionChange} />
            <span className="comments-button glyphicon glyphicon-ok" type="submit" onClick={this.handleCaptionSubmit} ></span>
          </form>
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
