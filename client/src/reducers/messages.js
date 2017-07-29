export default function messages(state = [
  { user: 'ChatBot',
    message: 'Welcome to React Chat -- Built using React, Redux, Express, and Socket.io'
  }, 
  { user: 'Mac Miller',
    message: 'I tots agree'
  },
  { user: 'Scott Mescudi',
    message: '!!!!!!!!!!!!!!!! I feel immortal'
  } 
], action) {
  switch (action.type) {
  case 'NEW_MESSAGE':
    return [
      ...state,
      action.payload
    ]
  default:
    return state;
  }
}