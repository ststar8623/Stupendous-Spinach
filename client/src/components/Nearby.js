import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { connect } from 'react-redux';
import NearbyPhotoCard from './NearbyPhotoCard';
import photoData from '../data/photoData';
import Loading from './Loading';
import { imageAction } from '../actions/imageAction';
import { Link } from 'react-router';

require('!style-loader!css-loader!sass-loader!../styles/main.scss');
require('!style-loader!css-loader!sass-loader!../styles/main.css');
class Nearby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIsFetched: false
    };
  }
  componentWillUpdate(nextProps) {
    let that = this;
    if (nextProps.location.isFetched && !this.state.dataIsFetched) {
      axios.post('/api/nearbyPhotos', { location: nextProps.location })
        .then((response) => {
          that.props.imageAction(response.data);
        })
        .then(() => {
          that.setState({
            dataIsFetched: true
          });  
        }).catch((error)=>{
          console.log('error', error);
        });
    }
  }

  componentWillUnmount() {
    this.setState({
      dataIsFetched: false
    });
  }
 
  renderPhotos() {
    return this.props.photoArray.map((photo, i) => {
    // console.log('photodata in Nearby: ', photoData);
    // to render the actual data use this.state.photoData
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
          <Loading />
        </div>
      );
    } else {
      return (
        <div className="container">
          <h4> Nearby Photos </h4>
          {this.renderPhotos.bind(this)()} 
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location,
    photoArray: state.photoArray.photoArray
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ imageAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Nearby);
