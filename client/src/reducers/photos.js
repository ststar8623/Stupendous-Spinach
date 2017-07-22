export default function photoArray(state = [], action) {
  switch (action.type) {
  case 'ALL_PHOTOS':
    return action.payload;
  case 'INCREMENT_LIKES':
    console.log('state in photo reducer ', state);
    const i = action.index;
    return [
      ...state.slice(0, i),
      {
        ...state[i], like_count: state[i].like_count + 1
      },
      ...state.slice(i + 1),
    ]
  default:
    return state;
  }
}