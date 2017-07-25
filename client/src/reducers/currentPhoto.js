export default function currentPhoto(state = {
  current: [],
  isFetched: false
}, action) {
  switch (action.type) {
  case 'CURRENT_PHOTO_COMMENTS':
    return {
      ...state,
      current: action.payload,
      isFetched: action.isFetched
    }
  case 'ADD_COMMENT':
    let newStateCurrent = state.current.slice();
    newStateCurrent.push({
      text: action.payload
    });
    return {
      ...state,
      current: newStateCurrent
    }
  case 'CURRENT_ISFETCHED':
    return {
      ...state,
      isFetched: action.payload
    }
  default:
    return state;
  }
}