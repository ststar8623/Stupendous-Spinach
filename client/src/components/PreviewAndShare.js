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
      commentText: '',
      photo: 'http://en.protothema.gr/wp-content/uploads/2016/01/anamur.jpg.pagespeed.ce_.y8U5lThvvI.jpg',
      id: 1
    };

    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleShareChange = this.handleShareChange.bind(this);
    // this.photo.url = 'http://en.protothema.gr/wp-content/uploads/2016/01/anamur.jpg.pagespeed.ce_.y8U5lThvvI.jpg';
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

  render() {
    return (
      <div className="preview-share-comp">
        <div>
          <img src="http://en.protothema.gr/wp-content/uploads/2016/01/anamur.jpg.pagespeed.ce_.y8U5lThvvI.jpg" height={200} width ={300} className='.img-thumbnail'/>
        </div>
          <form className="photo-form">
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
  return {location: 'TODO'};
};

export default PreviewAndShare;
// export default connect(mapStateToProps, {getLocation})(Camera);