import React, { Component } from 'react';
import { axiosAction } from '../helpers/axiosAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currentPhotoAction } from '../actions/imageAction';

class Comment extends Component {
  componentWillMount() {
    const { postId } = this.props.params;
    axiosAction('get', `/api/getAllComments/${postId}`, null, (comments) => {
      this.props.currentPhotoAction(comments.data);
    });
  }

  saveComment() {

  }

  render() {
    const comments = this.props.currentPhoto.map((comment, i) => {
      return (
        <li key={i}>{ comment }</li>
      );
    });
    return (
      <div>
        <ul>
          <comments />
        </ul>
        <form action="submit" >
          <input type="text" max="100" min="1" placeholder="Add a comment..." />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    photoArray: state.photoArray.photoArray,
    currentPhoto: state.currentPhoto.current
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ currentPhotoAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);