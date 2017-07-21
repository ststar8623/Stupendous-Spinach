import axios from 'axios';
const GET_LOCATION = 'GET_LOCATION';

export const getLocation = () => {
  const geolocation = navigator.geolocation;
  
  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }
    
    geolocation.getCurrentPosition((position, error) => {
      // if (error) {
      //   console.log('error ', error);
      // }
      console.log('postion: ', position);
      // fetchData(position);
      resolve(position);
    }, () => {
      reject (new Error('Permission denied'));
    });
  });
  console.log('position: ', location);
  return {
    type: GET_LOCATION,
    payload: location
  };
};

export const imageStoreAction = (url) => {
  return {
    type: 'IMAGE_UPLOAD',
    payload: url
  };
};

// const fetchData = (position) => {
//   axios.post('/api/nearbyPhotos', { location: position })
//     .then((response) => {
//       console.log('response', response);
//     });
// };