import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


class ProfileGoogleMap extends Component {
  //<img src={photo.url} className='test'/>
 
  render() {
    //  let currPosition = {
    //   center: {lat: 37.7837141, lng: -122.4090657},
    //   zoom: 11
    // };
    // var photos = this.props.mapPhoto.onePhotoFromRadius;

    // console.log('map photos', this.props.mapPhoto);
    // if (photos) {
    //   var latitudeObj = {};
    //   var photosDiv = photos.map((photo, i)=>{
    //     let latitude = photo.latitude;
    //     //latitudeObj[latitude] ? latitudeObj[latitude] = latitude : 'diff';
    //     return (
    //       <div key={i} lat={ photo.latitude } lng={ photo.longitude } >
    //         <img src={photo.url} className='test' onClick={this.selectedPhotoOnMap.bind(this, i)} />
    //       </div>
    //     );
    //   });
    // }
    // var photosDiv = this.props.photos.map((photo, i)=>{
    //   console.log(photo);
    //    return (
    //     <div key={i} lat={ photo.latitude } lng={ photo.longitude } >
    //     jkjlkjlkjsara
    //     </div>
    //   );

    // });  {photosDiv}


    
    return (
      <GoogleMapReact center={currPosition.center} zoom={13} >
               this is in ProfileGoogleMap  
      </GoogleMapReact>
    );
  }
}





export default ProfileGoogleMap;

