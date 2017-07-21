export default function photoArray(state = {
  photoArray: []
}, action) {
  switch (action.type) {
  case 'ALL_PHOTOS':
    return {
      ...state,
      photoArray: action.payload
    }
  default:
    return state;
  }
}