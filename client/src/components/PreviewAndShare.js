import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class PreviewAndShare extends Component {
  constructor() {
    super();
    // this.state = {
    //   uploadedPhoto: null
    // };
    this.state = {
      shareSelection: 'everyone',
      captionText: '',
      photo: '',
    };

    // {
    //   id: 1,
    //   profile_id: 1,
    //   latitude: '37.7876° N',
    //   longitude: '122.4001° W',
    //   url: 'http://img07.deviantart.net/a85d/i/2013/022/0/3/san_francisco_city_by_tt83x-d5seu41.jpg',
    //   like_count: 1,
    //   comment_count: 1,
    //   caption: 'SF at night!' 
    // }
// Does the image object live in state/store prior to imageupload in camera?
// if yes, need to delay submission of image until this page, after adding caption and share field
  

    this.handleCaptionSubmit = this.handleCaptionSubmit.bind(this);
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleShareChange = this.handleShareChange.bind(this);
  }

  handleCaptionChange(e) {
    this.setState({
      commentText: e.target.value
    });
  }

  handleShareChange(e) {
    this.setState({
      shareSelection: e.target.value
    });
  }

  handleCaptionSubmit(e) {
    e.preventDefault();
    console.log('handleCaptionChange invoked');
    let that = this;
    imageUpload(file, data => {
      that.props.imageStoreAction(data);
      browserHistory.push('/PreviewAndShare'); 
    });
 
  }

  render() {
    console.log('propsssssssss ', this.props);
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