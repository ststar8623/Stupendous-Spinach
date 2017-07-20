let INIT_STATE = {};

const geoLocation = (state = INIT_STATE, action) => {
  console.log('action: ', action);
  switch (action.type) {
  case 'GET_LOCATION':
    return {
          ...state, 
          latitude: action.payload.coords.latitude,
          longitude: action.payload.coords.longitude,
          timeStamp: action.payload.timestamp,
          isFetched: true
        }
  default:
    return state;
  }
};

export default geoLocation;