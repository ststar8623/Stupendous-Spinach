import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { imageStoreAction } from '../actions/imageAction'; //Needed?
import { captionedImageUpload } from '../helpers/imageUploadAction';
import Nearby from './Nearby';
import { browserHistory } from 'react-router';


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
    let that = this;
    let imageObj = {
      location: this.props.location,
      url: this.props.url,
      caption: this.state.captionText,
      shareSelection: this.state.shareSelection
    };

    captionedImageUpload(imageObj, (Url) => {
      browserHistory.push('/Nearby');
    });
 
  }

  render() {
    return (
      <div className="preview-share-comp">
        <div>
          <img src={this.props.url} height={200} width ={300} className='.img-thumbnail'/>
        </div>
        <form className="photo-form" onSubmit={this.handleCaptionSubmit}>
          <ul>
            <li style={ styles.li }><input type="radio" name="share-selection" value="everyone" onChange={this.handleShareChange} checked={this.state.shareSelection === 'everyone'} />Share with everyone</li>
            <li style={ styles.li }><input type="radio" name="share-selection" value="friends" onChange={this.handleShareChange} checked={this.state.shareSelection === 'friends'} />Share with friends only</li>
          </ul>
          <input type="text" name="caption-text" onChange={this.handleCaptionChange} />
          <input type="submit" value="save" />
        </form>
      </div>
    );
  }
}

const styles = {
  li: {
    listStyleType: 'none'
  }
};

const mapStateToProps = (state) => {
  return {
    url: state.upload.url,
    location: state.location
  };
};

export default connect(mapStateToProps)(PreviewAndShare);