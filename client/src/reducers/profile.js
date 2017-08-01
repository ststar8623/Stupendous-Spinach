export default function profile(state = {
  profilePhotos: null,
  profileInfo: null,
  profileId: null,
  profileUrl: null,
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
  case 'SET_USER_PROFILE_PIC':
    return {
      ...state,
      profileUrl: action.payload
    }
  default:
    return state;
  }
}