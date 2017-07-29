export default function upload(state = null, action) {
  switch (action.type) {
  case 'IMAGE_UPLOAD':
    return action.payload;
  default: 
    return state;
  }
}