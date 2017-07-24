export default function upload(state = { url: null }, action) {
  switch (action.type) {
  case 'IMAGE_UPLOAD':
    return {
      ...state,
      url: action.payload
    }
    default: 
      return state;
  }
}