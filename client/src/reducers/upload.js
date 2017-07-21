const INIT_STATE = {
  url: null
};

export default function images(state = INIT_STATE, action) {
  switch (action.type) {
  case 'IMAGE_UPLOAD':
    return {
      ...state,
      url: action.payload
    }
  }
}