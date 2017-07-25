const geoLocation = (state = {isFetched: false}, action) => {
  switch (action.type) {
  case 'GET_LOCATION':
    return {
      ...state, 
      latitude: action.payload.coords.latitude,
      longitude: action.payload.coords.longitude,
      timeStamp: action.payload.timestamp
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