import React, { Component } from 'react';
import Comments from './Comments';
import { Link } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';

require('../styles/main.css');

class NearbyPhotoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount: this.props.photo.like_count,
      photoId: this.props.photo.id
    };
    this.addLike = this.addLike.bind(this);
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
<<<<<<< f8702bd7c39ae36b186ed60f3206cabecdf9cc8f
        <img src={url} height={200} width ={300} className='.img-thumbnail'/>
        <div style={styles.like}>
          <span className="fa fa-heart" aria-hidden="true" onClick={this.addLike}> {this.state.likeCount} Likes </span>
          <span className="fa fa-comment" id="comments" style={styles.comment} aria-hidden="true">
            <Link to={commentId}> {comment_count } Comments </Link>
=======
        <img src={ url } className='img-thumbnail'/>
        <div>
          <span className="fa fa-heart heart" aria-hidden="true"> { like_count }<span className="like">Likes</span> </span>
          <span className="fa fa-comment comment" aria-hidden="true">
            <Link to={ commentId }>{ comment_count }<span className="like">Comments</span></Link>
>>>>>>> Restyle Css
          </span>
        </div>
        <h6 className='text'>{ caption }</h6>
      </div> 
    );
  }
}

export default NearbyPhotoCard;

