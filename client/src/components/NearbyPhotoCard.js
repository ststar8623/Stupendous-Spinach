import React, { Component } from 'react';

class NearbyPhotoCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="img-rounded">
        <img src={this.props.photo.url} height={200} width ={300} className='.img-thumbnail'/>
        <div style={styles.like}>
          <span className="fa fa-heart" aria-hidden="true"> Likes </span>
          <span className="fa fa-comment" style={styles.comment} aria-hidden="true"> Comments </span>
        </div>
        <h6 className='text'>{this.props.photo.caption} </h6>
      </div>
    );
  }
}

const styles = {
  like: {
    fontSize: '16px',
    padding: '4px'
  },
  comment: {
    float: 'right'
  }
};

export default NearbyPhotoCard;
