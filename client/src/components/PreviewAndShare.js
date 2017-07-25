import React, {Component} from 'react';
import { connect } from 'react-redux';
import { imageIsFetched } from '../actions/imageAction'; //Needed?
import { captionedImageUpload } from '../helpers/imageUploadAction';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { urlAction } from '../actions/urlAction';

class PreviewAndShare extends Component {
  constructor() {
    super();
    this.state = {
      shareSelection: 'everyone',
      captionText: ''
    };
  
    this.handleCaptionSubmit = this.handleCaptionSubmit.bind(this);
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleShareChange = this.handleShareChange.bind(this);
  }

  componentWillMount() {
    this.props.urlAction('share');
  }

  componentWillUnmount() {
    this.props.urlAction('nearby');
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
    let imageObj = {
      location: this.props.location,
      url: this.props.url,
      caption: this.state.captionText,
      shareSelection: this.state.shareSelection
    };

    captionedImageUpload(imageObj, (Url) => {
      browserHistory.push('/');
      this.props.imageIsFetched(false);
    });
 
  }

  render() {
    return (
      <div className="preview-share-comp">
        <div className="img-rounded">
          <img src={this.props.url} height={200} width={300} className='img-thumbnail'/>
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

const mapStateToProps = (state) => {
  return {
    url: state.upload.url,
    location: state.location
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ imageIsFetched, urlAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewAndShare);
