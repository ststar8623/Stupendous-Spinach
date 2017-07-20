let INIT_STATE = {
  location: null,
  isFetched: false
};
const geoLocation = (state = INIT_STATE, action) => {
  switch (action.type) {
  case 'GET_LOCATION':
    return {
      location: action.payload,
      isFetched: true
    };
  default:
    return state;
  }
};

export default geoLocation;