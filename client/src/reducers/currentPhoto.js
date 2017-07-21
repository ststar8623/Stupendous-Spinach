export default function currentPhoto(state = {
  current: []
}, action) {
  switch (action.type) {
  case 'CURRENT_PHOTO_COMMENTS':
    return {
      ...state,
      current: action.payload
    }
  default:
    return state;
  }
}