import React, { Component } from 'react';
import Comments from './Comments';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { increment, decrement } from '../actions/likeAction';
import { bindActionCreators } from 'redux';
import { axiosAction } from '../helpers/axiosAction';
import CSSTransitionGroup from 'react-addons-css-transition-group';

require('../styles/main.css');

class NearbyPhotoCard extends Component {
  constructor(props) {
    super(props);
  }

  likeOrDislike(i, liked, id) {
    const incrementOrDecrement = liked ? 'decrement' : 'increment';
    const putOrPost = liked ? 'put' : 'post';
    const axiosLikeOrDislike = liked ? `/api/removelike/${id}` : `/api/addlike/${id}`;

    this.props[incrementOrDecrement](i);
    axiosAction(putOrPost, axiosLikeOrDislike, null, (response) => {
      console.log('successfully from the database', response);
    });
  }

  render() {
    const { url, like_count, comment_count, id, caption, liked, age, first } = this.props.photo;
    const commentId = `/comments/${id}`;
    const { i } = this.props;
    const heart = liked ? "fa fa-heart heart" : "glyphicon glyphicon-heart-empty heart";
    const likedCounts = !like_count ? '' : like_count + ' ';
    const oneOrMoreLike = like_count === 1 ? 'Like' : 'Likes';
    const commentCounts = !comment_count ? 'No ' : comment_count + ' ';
    const zeroOrMoreComment = !comment_count ? 'comment' : 'comments';

    return (
      <div className="img-rounded">
        <div>
          <span className="dateAndTime">Date And Time</span>
          <img src={ url } className='img-thumbnail'/>
        </div>
        <div className="likeCaptionComment">
          <div>
            <span className="profile">{ first }</span>
          </div>
          <CSSTransitionGroup transitionName="like" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <span key={ like_count } className={ heart } aria-hidden="true" onClick={ this.likeOrDislike.bind(this, i, liked, id) }></span>
          </CSSTransitionGroup>
          <div className="likeDiv">
            <span className="likes">{ likedCounts }</span>
            <span className="likeCount">{ oneOrMoreLike }</span>
          </div>
          { caption ? <h6 className='h6-nearbyPhotoCard'>{ caption }</h6> : '' }
          <Link to={ commentId }>
            <div className="commentDiv">
              <span className="commentCount">{ commentCounts }</span>
              <span className="comments">{ zeroOrMoreComment }</span>
            </div>
          </Link>
        </div>
      </div> 
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ increment, decrement }, dispatch);
};

export default connect(null, mapDispatchToProps)(NearbyPhotoCard);

