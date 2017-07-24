export default function url(state = null, action) {
  switch (action.type) {
  case 'CURRENT_URL':
    return action.payload;
  default: 
    return state;
  }
}