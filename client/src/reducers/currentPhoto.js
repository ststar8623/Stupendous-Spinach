export default function currentPhoto(state = [], action) {
  switch (action.type) {
  case 'CURRENT_PHOTO_COMMENTS':
    return action.payload;
  case 'ADD_COMMENT':
    let newState = state.slice();
    newState.push({
      text: action.payload
    });
    return newState;
  default:
    return state;
  }
}