import axios from 'axios';
const GET_LOCATION = 'GET_LOCATION';

export const getLocation = () => {
  const geolocation = navigator.geolocation;
  
  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }
    
    geolocation.getCurrentPosition((position, error) => {

      console.log('postion: ', position);
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