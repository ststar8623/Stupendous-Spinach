export default function profile(state = {
  profilePhotos: null,
  profileInfo: null,
  profileIsFetched: false
}, action) {
  switch (action.type) {
  case 'PROFILE_PHOTO':
    return {
      ...state,
      profilePhotos: action.payload
    }
  case 'PROFILE_INFO':
    return {
      ...state,
      profileInfo: action.payload,
      profileIsFetched: true
    }
  case 'PROFILE_ISFETCHED':
    return {
      ...state,
      profileIsFetched: false
    }
  default:
    return state;
  }
}