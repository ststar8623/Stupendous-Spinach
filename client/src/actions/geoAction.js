export const getLocation = () => {
  const geolocation = navigator.geolocation;
  
  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }
    geolocation.getCurrentPosition((position, error) => {
      resolve(position);
    }, () => {
      reject (new Error('Permission denied'));
    });
  });
  console.log('location', location);
  return {
    type: 'GET_LOCATION',
    payload: location
  };
};