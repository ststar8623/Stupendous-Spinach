const location = (state = {
  isFetched: false,
  photoArrayIsFetched: false
}, action) => {
  switch (action.type) {
  case 'GET_LOCATION':
    return {
      ...state, 
      latitude: action.payload.coords.latitude,
      longitude: action.payload.coords.longitude,
      timeStamp: action.payload.timestamp,
      isFetched: action.payload.isFetched
    }
  case 'IMAGE_ISFETCHED':
    return {
      ...state,
      photoArrayIsFetched: action.payload
    }
  default:
    return state;
  }
};

export default location;