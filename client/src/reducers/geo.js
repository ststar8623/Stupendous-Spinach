const geoLocation = (state = {}, action) => {
  switch (action.type) {
  case 'GET_LOCATION':
    return {
      ...state, 
      latitude: action.payload.coords.latitude,
      longitude: action.payload.coords.longitude,
      timeStamp: action.payload.timestamp,
      isFetched: false
    }
  case 'IMAGE_ISFETCHED':
    return {
      ...state,
      isFetched: action.payload
    }
  default:
    return state;
  }
};

export default geoLocation;