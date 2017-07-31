export default function messages(state = {
  messageArray: [],
  rooms: []  
}, action) {
  switch (action.type) {
  case 'NEW_MESSAGE':
    return {
      ...state,
      messageArray: action.payload
    }
  default:
    return state;
  }
}