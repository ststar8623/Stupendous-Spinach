export default function mapPhoto(state = {
  allPhotoFromRadius: [],
  somePhotoFromRadius: [],
  onePhotoFromRadius: null,
  isFetched: false
}, action) {
  switch (action.type) {
  case 'FETCH_PHOTO_FROM_RADIUS':
    return {
      ...state,
      allPhotoFromRadius: action.payload,
    }
  case 'SELECT_PHOTO_FROM_RADIUS':
    return {
      ...state,
      somePhotoFromRadius: action.payload,
    }
  case 'ONE_PHOTO_FROM_RADIUS':
    return {
      ...state,
      onePhotoFromRadius: action.payload,
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