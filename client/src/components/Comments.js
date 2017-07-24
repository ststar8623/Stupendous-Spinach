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
    let that = this;
    if (this.state.comment.length === 0) {
      return;
    }
    const { postId } = this.props.params;
    const { index } = this.props.params;
    // this.props.addComment(this.state.comment);
    this.props.incrementComment(index);
    axiosAction('post', `/api/saveComment/${postId}`, { text: this.state.comment }, (response) => {
      console.log('Comment saved to database');
      that.fetchCurrentComments();
      that.setState({
        comment: ''
      });
    });
  }

  render() {
    const comments = this.props.currentPhoto.map((comment, i) => {
      const firstName = comment.username ? comment.username.split(' ')[0] : '';
      return (
        <li className="comments-li" key={i}><span className="comments-profile">{ firstName }</span><span className="comments-text">{ comment.text }</span></li>
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
            <button className="comments-button glyphicon glyphicon-ok" type="submit" onClick={this.handleSubmit.bind(this)}></button>
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