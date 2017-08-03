export default function mapPhoto(state = {
  allPhotoFromRadius: [],
  allPhotoFromUser: [],
  somePhotoFromRadius: [],
  onePhotoFromRadius: null,
  currentSelectedIndex: null,
  oneUserPhoto: null,
  isFetched: false,
  oneUserPhotoIsFetched: false
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
      currentSelectedIndex: action.index
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
  case 'ONE_USER_PHOTO_ISFETCHED':
    return {
      ...state,
      oneUserPhotoIsFetched: action.payload
    }
  case 'ALL_PHOTO_FROM_USER':
    return {
      ...state,
      allPhotoFromUser: action.payload,
      oneUserPhotoIsFetched: true
    }
  case 'SELECT_PHOTO_FROM_PROFILE':
    return {
      ...state,
      oneUserPhoto: action.payload
    }
  default:
    return state;
  }
}