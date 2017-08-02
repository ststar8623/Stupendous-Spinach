import React, { Component } from 'react';
import Comments from './Comments';
import Profile from './Profile';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { increment, decrement } from '../actions/likeAction';
import { bindActionCreators } from 'redux';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { selectOnePhotoFromRadius } from '../actions/imageAction';

class NearbyPhotoCard extends Component {
  constructor(props) {
    super(props);
  }

  likeOrDislike(i, liked, id) {
    const incrementOrDecrement = liked ? 'decrement' : 'increment';
    this.props[incrementOrDecrement](id, i);
  }

  enLargePhoto(photo) {
    this.props.selectOnePhotoFromRadius(photo);
  }

  render() {
    const { url, like_count, comment_count, id, caption, liked, age, first, distance, profile_photo, profile_id } = this.props.photo;
    const { i } = this.props;
    const commentId = `/comments/${id}/${i}`;
    const heart = liked ? "fa fa-heart heart" : "fa fa-heart-o heart";
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
    const commentCounts = !comment_count ? 'No' : comment_count;
    const zeroOrMoreComment = comment_count <= 1 ? 'comment' : 'comments';

    let timeLapse = null;
    if (!age.days) { 
      age.days = 0;
    }
    if (age.days) {
      timeLapse = age.days + ' days';
    } else if (age.hours) {
      timeLapse = age.hours + ' hours';
    } else if (age.minutes) {
      timeLapse = age.minutes + ' minutes';
    } else {
      timeLapse = 'Just now...';
    }

    let profilePhoto = profile_photo ? profile_photo : 'https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg';

    let distanceTime = ' ' + `${distance} mi, ${timeLapse}` + ' ';

    const inGoogleMapOrNearbyPhotoCard = this.props.url === 'nearby' ? <img src={ url } className='img-thumbnail' /> : <img src={ url } className='img-thumbnail' onClick={this.enLargePhoto.bind(this, null)} />;
    const inGoogleMapOrNearbyPhotoCardClassName = this.props.url === 'nearby' ? "img-rounded col-xs-12 col-md-6 col-lg-3" : "img-rounded photoCard-in-googleMap col-xs-12 col-md-6 col-lg-3";
    return (
      <div className={ inGoogleMapOrNearbyPhotoCardClassName }>
        <div>
          <span className="dateAndTime">{ distanceTime }</span>
          { inGoogleMapOrNearbyPhotoCard }
        </div>
        
        <div className="likeCaptionComment">
          <Link to={ `/user/${profile_id}` }>
            <div>
              <span className="profile">{ first }</span>
              <img src={profilePhoto} className="fb-icon"/>
            </div>
          </Link>
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

const mapStateToProps = (state) => {
  return {
    url: state.url
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ increment, decrement, selectOnePhotoFromRadius }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NearbyPhotoCard);

