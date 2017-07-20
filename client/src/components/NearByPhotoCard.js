import React, { Component } from 'react';

class NearByPhtoCard extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="img-rounded">
        <img src={this.props.photo.url} height={200} width ={300} className='.img-thumbnail'/>
        <span className= 'fa fa-heartbeat" aria-hidden="true'></span>
        <h6 className='text'>{this.props.photo.caption} </h6>
      </div>
    );
  }
}

export default NearByPhtoCard;