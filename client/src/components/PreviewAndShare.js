import React, {Component} from 'react';
import { connect } from 'react-redux';

class PreviewAndShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedPhoto: null
    };

    this.photo.url = 'http://en.protothema.gr/wp-content/uploads/2016/01/anamur.jpg.pagespeed.ce_.y8U5lThvvI.jpg';
  }

  // componentWillMount() {
  //   this.props.getLocation();
  // }

  // onImageDrop(file) {
  //   console.log('this.props: ' , this.props);
  //   imageUpload(file, this.props.location, data => {
  //     this.setState({
  //       uploadedPhoto: data
  //     }, () => {
  //       console.log('state: ', this.state);
  //     });
  //   });
  // }

  render() {
    return (
      <div className="preview-share-comp">
        <img src={this.photo.url} height={200} width ={300} className='.img-thumbnail'/>
          <form className="photo-form">
            <input type="radio" name="share-selection" value="everyone" checked="checked">Share with everyone</input>
            <input type="radio" name="share-selection" value="friends">Share with friends only</input>
            <input type="text" name="caption-text"></input>
            <input type="submit" value="save"></input>
          </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {location: state.};
};


export default PreviewAndShare;
// export default connect(mapStateToProps, {getLocation})(Camera);