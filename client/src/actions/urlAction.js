export const urlAction = (url) => {
  return {
    type: 'CURRENT_URL',
    payload: url
  };
};

export const urlUploadAction = (url) => {
  return {
    type: 'IMAGE_UPLOAD',
    payload: url
  };
};