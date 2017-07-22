import React, { Component } from 'react';
import Comments from './Comments';
import { Link } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { increment } from '../actions/likeAction';
import { bindActionCreators } from 'redux';

require('../styles/main.css');

class NearbyPhotoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.photo.id
    };
  }

  addLike() {
    console.log('state id', this.state.id);
    this.props.increment(this.state.id);
  }

  render() {
    const { url, like_count, comment_count, id, caption } = this.props.photo;
    const commentId = `/comments/${id}`;
    return (
      <div className="img-rounded">
        <img src={ url } className='img-thumbnail'/>
        <div>
          <span className="fa fa-heart heart" aria-hidden="true" onClick={ this.addLike.bind(this) }>{ like_count }</span>
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
  return bindActionCreators({ increment }, dispatch);
};

export default connect(null, mapDispatchToProps)(NearbyPhotoCard);

