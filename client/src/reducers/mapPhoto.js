export default function mapPhoto(state = {
  allPhotoFromRadius: [],
  isFetched: false
}, action) {
  switch (action.type) {
  case 'FETCH_PHOTO_FROM_RADIUS':
    return {
      ...state,
      allPhotoFromRadius: action.payload
    }
  case 'MAP_PHOTO_ISFETCHED':
    return {
      ...state,
      isFetched: true
    }
  default:
    return state;
  }
}