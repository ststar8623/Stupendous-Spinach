export default function profile(state = {
  profilePhotos: null,
  profileInfo: null,
  profileId: null,
  profileUrl: null,
  sendUserInfo: null,
  profileIsFetched: false,
  currentProfilePhoto: [],
  myId: null
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
      profileUrl: action.payload.url,
      profileInfo: action.payload.first
    }
  case 'SET_SEND_PROFILE':
    return {
      ...state,
      sendUserInfo: action.payload
    }
  case 'SELECT_PHOTO_FROM_PROFILE':
    return {
      ...state,
      currentProfilePhoto: action.payload
    }
  case 'SET_MY_ID':
    return {
      ...state,
      myId: action.payload
    }
  default:
    return state;
  }
}