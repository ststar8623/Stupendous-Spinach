import React, { Component } from 'react';
import Comments from './Comments';
import { Link } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';

class NearbyPhotoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount: null,
      photoId: this.props.photo.id
    };
    this.addLike = this.addLike.bind(this);
    //this.addLike();
  }



  addLike() {
    axios.post('/api/addlike', { photoId: this.state.photoId})
      .then((response) => {
        this.setState({
          likeCount: response.data.like_count
        });
      }).catch((error)=>{
        console.log('error', error);
      });
  }

  render() {
    const { url, like_count, comment_count, id, caption } = this.props.photo;
    const commentId = `/comments/${id}`;
    return (
      <div className="img-rounded">
        <img src={url} height={200} width ={300} className='.img-thumbnail'/>
        <div style={styles.like}>
          <span className="fa fa-heart" aria-hidden="true" onClick={this.addLike}> {this.props.photo.like_count} Likes </span>
          <span className="fa fa-comment" id="comments" style={styles.comment} aria-hidden="true">
            <Link to={commentId}> {comment_count } Comments </Link>
          </span>
        </div>
        <h6 className='text'>{caption} </h6>
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

