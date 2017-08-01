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
  const fakeLocation = {
    coords: {
      latitude: 37.7836526, 
      longitude:-122.4089972
    },
    timestamp: 0,
    isFetched: true
  };
  return {
    type: 'GET_LOCATION',
    payload: fakeLocation
  };
};
