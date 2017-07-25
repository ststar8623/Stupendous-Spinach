import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currentPhotoAction, currentIsFetched } from '../actions/imageAction';
import { incrementComment } from '../actions/likeAction';
import { urlAction } from '../actions/urlAction';
import Loading from './Loading';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  componentWillMount() {
    this.fetchCurrentComments();
    this.props.urlAction('comments');
  }

  fetchCurrentComments() {
    const { postId } = this.props.params;
    this.props.currentPhotoAction(postId);
    this.setState({
      comment: ''
    });
  }

  componentWillUnmount() {
    this.props.currentIsFetched(false);
  }

  handleChange(event) {
    this.setState({
      comment: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.comment.length === 0) {
      return;
    }
    const { postId } = this.props.params;
    const { index } = this.props.params;
    this.props.incrementComment(postId, { text: this.state.comment }, index, () => {
      this.fetchCurrentComments();
    });
  }
  removeComment() {
    axiosAction('put', `/api/removeComment/${postId}`, (response) => {
      console.log('Comment saved to database');
      that.fetchCurrentComments();
      that.setState({
        comment: ''
      });
    });
  }


  render() {
    const comments = this.props.currentPhoto.map((comment, i) => {
<<<<<<< HEAD
=======
      //console.log('current commenter id', this.props.currentPhoto[i].profile_id);
      console.log('===.',comment); 
      let isFalse = this.props.photoArray[this.props.params.index].profile_id === comment.profile_id; 

      console.log('props====>',this.props);
>>>>>>> show delete x for every comments if your are the commentor
      const firstName = comment.username ? comment.username.split(' ')[0] : '';
      const photo = comment.profile_photo ? comment.profile_photo : 'https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg';

      return (
        <li className="comments-li" key={i}> 
          <div>
            <img src={photo} className="comments-icon"/>
            <span className="comment-combined">
<<<<<<< HEAD
              <strong> { firstName}  </strong> &nbsp;
              { comment.text } 
            </span>
          </div>
        </li>
=======
              <strong> { firstName} </strong> &nbsp;
              { comment.text } 
              { isFalse ? <button className='deleteComments' onClick={this.removeComment.bind(null)}> &times; </button> : ''}
            </span>           
          </div>
        </li>

>>>>>>> show delete x for every comments if your are the commentor
      );
    });

    const isFetched = this.props.isFetched;

    if (!isFetched) {
      return (
        <div>
          <Loading />
        </div>
      );
    } else {
      return (
        <div className="comments-component">
          <div>
            <ul className="comments-Ul">
              { comments }
            </ul>
          </div>
          <form className="comments-form" onSubmit={this.handleSubmit.bind(this)}>
            <input className="comments-input" type="text" max="100" min="1" placeholder="Add a comment..." onChange={this.handleChange.bind(this)} value={this.state.comment}/>
            <span className="comments-button glyphicon glyphicon-ok" type="submit" onClick={this.handleSubmit.bind(this)}></span>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    photoArray: state.photoArray,
    currentPhoto: state.currentPhoto.current,
    isFetched: state.currentPhoto.isFetched,
    url: state.url
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ currentPhotoAction, incrementComment, currentIsFetched, urlAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
