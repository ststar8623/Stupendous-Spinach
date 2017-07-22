import React, { Component } from 'react';
import Comments from './Comments';
import { Link } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { increment, decrement } from '../actions/likeAction';
import { bindActionCreators } from 'redux';

require('../styles/main.css');

class NearbyPhotoCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { url, like_count, comment_count, id, caption, liked } = this.props.photo;
    const commentId = `/comments/${id}`;
    const { i } = this.props;

    const heart = liked ? "fa fa-heart heart" : "glyphicon glyphicon-heart-empty heart";
    const likeOrDislike = liked ? 'decrement' : 'increment';

    return (
      <div className="img-rounded">
        <img src={ url } className='img-thumbnail'/>
        <div>
          <span className={ heart } aria-hidden="true" onClick={ this.props[likeOrDislike].bind(null, i) }>{ like_count }</span>
          <span className="fa fa-comment comment" aria-hidden="true">
            <Link to={ commentId }>{ comment_count }<span className="comments">Comments</span></Link>
          </span>
        </div>
        <h6 className='text'>{ caption }</h6>
      </div> 
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ increment, decrement }, dispatch);
};

export default connect(null, mapDispatchToProps)(NearbyPhotoCard);

