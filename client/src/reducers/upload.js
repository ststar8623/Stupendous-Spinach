const INIT_STATE = {
  url: null
};

export default function upload(state = INIT_STATE, action) {
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