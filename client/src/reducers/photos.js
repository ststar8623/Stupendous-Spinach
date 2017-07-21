export default function photoArray(state = {
  photoArray: []
}, action) {
  console.log('state =========> ', state, 'action ==========> ', action.payload);
  switch (action.type) {
  case 'ALL_PHOTOS':
    return {
      ...state,
      photoArray: action.payload
    }
  default:
    return state;
  }
}