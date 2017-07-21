import React, { Component } from 'react';
import axios from 'axios';

class Comment extends Component {
  componentWillMount() {
    const { postId } = this.props.params;
  }
  render() {
    console.log(this.props);
    return (
      <div className="fixed-bottom">
        <form action="submit">
          <input type="text" max="100" min="1" placeholder="Add a comment..." />
        </form>
      </div>
    );
  }
}

export default Comment;