import axios from 'axios';

export const newMessage = (data) => {
  return {
    type: 'NEW_MESSAGE',
    payload: data
  };
};

export const createMessage = (data) => {

};