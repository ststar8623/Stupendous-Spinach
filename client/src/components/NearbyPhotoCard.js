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
        <img src={ url } className='img-thumbnail'/>
        <div>
          <span className="fa fa-heart heart" aria-hidden="true" onClick={ this.addLike }>{ this.state.likeCount }<span className="like">Likes</span></span>
          <span className="fa fa-comment comment" aria-hidden="true">
            <Link to={ commentId }>{ comment_count }<span className="like">Comments</span></Link>
          </span>
        </div>
        <h6 className='text'>{ caption }</h6>
      </div> 
    );
  }
}

export default NearbyPhotoCard;

