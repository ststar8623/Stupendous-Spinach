import React, { Component } from 'react';
import NearbyPhotoCard from './NearbyPhotoCard';
import photoData from '../data/photoData';
import axios from 'axios';
import { connect } from 'react-redux';
require('!style-loader!css-loader!sass-loader!../styles/main.scss');

class Nearby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIsFetched: false,
      photoData: []
    };
  }
  componentWillUpdate(nextProps) {
    console.log('nextProps ', nextProps);
    let that = this;
    if (nextProps.location.isFetched && !this.state.dataIsFetched) {
      axios.post('/api/nearbyPhotos', { location: nextProps.location })
        .then((response) => {
          console.log('response', response);
          that.setState({
            dataIsFetched: true,
            photoData: response.data
          });
        }).catch((error)=>{
          console.log('error', error);
        });
    }
  }
 
  renderPhotos() {
    // to render the acutal data use this.state.photoData
    return photoData.map((photo, i) => {
      return (
        <NearbyPhotoCard key={i} photo={photo} />
      );
    });
  }
  render() {
    const isFetched = this.props.location.isFetched;
    if (!isFetched) {
      return (
        <div>
          <div className="contain">
            <svg style={{height:80, width:210}}>
              <ellipse style={{cx:25 ,cy:20, fill:"none", rx:10, ry: 10}}></ellipse>
            </svg>
            <svg style={{height:80, width:210}}>
              <ellipse style={{cx:62.5 ,cy:20, fill:"none", rx:10, ry: 10}}></ellipse>
            </svg>
            <svg style={{height:80, width:210}}>
              <ellipse style={{cx:100 ,cy:20, fill:"none", rx:10, ry: 10}}></ellipse>
            </svg>
            <svg style={{height:80, width:210}}>
              <ellipse style={{cx:137.5 ,cy:20, fill:"none", rx:10, ry: 10}}></ellipse>
            </svg>
            <svg style={{height:80, width:210}}>
              <ellipse style={{cx:175 ,cy:20, fill:"none", rx:10, ry: 10}}></ellipse>
            </svg>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1> Nearby Photos </h1>
          {this.renderPhotos.bind(this)()}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location
  };
};

export default connect(mapStateToProps)(Nearby);
