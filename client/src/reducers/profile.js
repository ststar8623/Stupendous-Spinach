export default function profile(state = {
  profilePhotos: null,
  profileInfo: null,
  profileId: null,
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
  case 'SET_USER_ID':
    return {
      ...state,
      profileId: action.payload
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