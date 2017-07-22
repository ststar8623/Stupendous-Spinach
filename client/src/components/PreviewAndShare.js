import React, {Component} from 'react';
import { connect } from 'react-redux';
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
          <img style={ styles.img } src={this.props.url} height={200} width={300} className='.img-thumbnail'/>
        </div>
        <form className="photo-form" onSubmit={this.handleCaptionSubmit}>
          <ul>
            <li style={ styles.li }><input type="radio" name="share-selection" value="everyone" onChange={this.handleShareChange} checked={this.state.shareSelection === 'everyone'} />Share with everyone</li>
            <li style={ styles.li }><input type="radio" name="share-selection" value="friends" onChange={this.handleShareChange} checked={this.state.shareSelection === 'friends'} />Share with friends only</li>
          </ul>
          <input style={ styles.caption } type="text" name="caption-text" onChange={this.handleCaptionChange} />
          <div>
            <button style={ styles.submit } type="submit" value="save">Done</button>
          </div>
        </form>
      </div>
    );
  }
}

const styles = {
  img:{
    marginTop: '10px',
    display: 'block'
  },
  li: {
    listStyleType: 'none',
    'fontSize': 16,
    'align': 'center'
  },
  submit: {
    color: 'white',
    width: '300px',
    'backgroundColor': 'blue',
    'textAlign': 'center',
    align: 'center',
    right: 0,
    left: 0,
    'marginRight': 'auto',
    'marginLeft': 'auto'
  },
  caption: {
    width: 300,
    border: '1px solid black',
    align: 'center'
  }
};

const mapStateToProps = (state) => {
  return {
    url: state.upload.url,
    location: state.location
  };
};

export default connect(mapStateToProps)(PreviewAndShare);