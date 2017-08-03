import axios from 'axios';

export const newMessage = (data) => {
  return {
    type: 'NEW_MESSAGE',
    payload: data
  };
};

export const resetMessage = (data) => {
  return {
    type: 'RESET_MESSAGE',
    payload: data
  };
};