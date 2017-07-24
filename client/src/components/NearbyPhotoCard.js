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
    const { url, like_count, comment_count, id, caption, liked, age, first, distance } = this.props.photo;
    const { i } = this.props;
    const commentId = `/comments/${id}/${i}`;
    const heart = liked ? "fa fa-heart heart" : "glyphicon glyphicon-heart-empty heart";
    let likedCounts, oneOrMoreLike;
    if (!like_count) {
      likedCounts = '';
      oneOrMoreLike = '';
    } else if (like_count === 1) {
      likedCounts = like_count + ' ';
      oneOrMoreLike = 'Like';
    } else {
      likedCounts = like_count + ' ';
      oneOrMoreLike = 'Likes';
    }
    const commentCounts = !comment_count ? 'No ' : comment_count + ' ';
    const zeroOrMoreComment = comment_count <= 1 ? 'comment' : 'comments';

    let timeLapse = null;

    if (age.days) {
      timeLapse = age.days + ' days';
    } else if (age.hours) {
      timeLapse = age.hours + ' hours';
    } else if (age.minutes) {
      timeLapse = age.minutes + ' minutes';
    } else {
      timeLapse = 'Just Now';
    }

    let distanceTime = ' ' + `${distance} mi, ${timeLapse}` + ' ';

    return (
      <div className="img-rounded">
        <div>
          <span className="dateAndTime">{ distanceTime }</span>
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
          { caption ? <span className='photo-caption'>{ caption }</span> : '' }
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

