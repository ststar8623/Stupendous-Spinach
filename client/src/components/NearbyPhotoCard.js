import React, { Component } from 'react';

class NearbyPhotoCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="img-rounded">
        <img src={this.props.photo.url} height={200} width ={300} className='.img-thumbnail'/>
        <i className="fa fa-heartbeat" aria-hidden="true"> </i>

        <h6 className='text'>{this.props.photo.caption} </h6>
      </div>
    );
  }
}

export default NearbyPhotoCard;
