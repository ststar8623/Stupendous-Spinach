import React, { Component } from 'react';
import { axiosAction } from '../helpers/axiosAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currentPhotoAction, currentIsFetched } from '../actions/imageAction';
import { incrementComment, addComment } from '../actions/likeAction';
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
    axiosAction('get', `/api/getAllComments/${postId}`, null, (comments) => {
      this.props.currentPhotoAction(comments.data);
      this.props.currentIsFetched(true);
    });
  }

  componentWillUnmount() {
    this.props.currentIsFetched(false);
    this.props.urlAction(null);
  }

  handleChange(event) {
    this.setState({
      comment: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { postId } = this.props.params;
    const { index } = this.props.params;
    this.props.addComment(this.state.comment);
    this.props.incrementComment(index);
    axiosAction('post', `/api/saveComment/${postId}`, { text: this.state.comment }, (response) => {
      console.log('Comment saved to database');
      this.fetchCurrentComments();
    });
  }

  render() {
    const comments = this.props.currentPhoto.map((comment, i) => {
      return (
        <li className="comments-li" key={i}>{ comment.text }</li>
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
        <div>
          <ul className="comments-Ul">
            { comments }
          </ul>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" max="100" min="1" placeholder="Add a comment..." onChange={this.handleChange.bind(this)}/>
            <input type="submit" value="Submit" />
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
  return bindActionCreators({ currentPhotoAction, incrementComment, addComment, currentIsFetched, urlAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);