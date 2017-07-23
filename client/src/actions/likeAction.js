// increment likes
export const increment = (index) => {
  return {
    type: 'INCREMENT_LIKES',
    index
  };
};

export const decrement = (index) => {
  return {
    type: 'DECREMENT_LIKES',
    index
  };
};

// add comments
export const incrementComment = (index) => {
  return {
    type: 'INCREMENT_COMMENT',
    index
  };
};

export const addComment = (comment) => {
  return {
    type: 'ADD_COMMENT',
    payload: comment
  };
};