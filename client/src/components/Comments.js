import React, { Component } from 'react';
import { axiosAction } from '../helpers/axiosAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currentPhotoAction } from '../actions/imageAction';
import { incrementComment, addComment } from '../actions/likeAction';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  componentWillMount() {
    this.fetchCurrentComments();
  }

  fetchCurrentComments() {
    const { postId } = this.props.params;
    axiosAction('get', `/api/getAllComments/${postId}`, null, (comments) => {
      this.props.currentPhotoAction(comments.data);
    });
  }

  handleChange(event) {
    this.setState({
      comment: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { postId } = this.props.params;
    this.props.addComment(this.state.comment);
    this.props.incrementComment(postId);
    axiosAction('post', `/api/saveComment/${postId}`, { text: this.state.comment }, (response) => {
      console.log('Comment saved to database');
      this.fetchCurrentComments();
    });
  }

  render() {
    const comments = this.props.currentPhoto.map((comment, i) => {
      return (
        <li key={i}>{ comment.text }</li>
      );
    });
    return (
      <div>
        <ul>
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

const mapStateToProps = (state) => {
  return {
    photoArray: state.photoArray,
    currentPhoto: state.currentPhoto
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ currentPhotoAction, incrementComment, addComment }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);