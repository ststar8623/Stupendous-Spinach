import React, { Component } from 'react';

class Single extends Component {
  render() {
    const i = this.props.posts.findIndex((post) => post.code === this.props.params.postId);
    console.log(i);
    return (
      <div className="single-photo">
        im single photo
      </div>
    );
  }
}

export default Single;