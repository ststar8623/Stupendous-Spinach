export const imageAction = (photoArray) => {
  return {
    type: 'ALL_PHOTOS',
    payload: photoArray
  };
};

export const imageStoreAction = (url) => {
  return {
    type: 'IMAGE_UPLOAD',
    payload: url
  };
};

export const currentPhotoAction = (comments) => {
  return {
    type: 'CURRENT_PHOTO_COMMENTS',
    payload: comments
  };
};

export const fetchPhotoFromRadius = (array) => {
  return {
    type: 'FETCH_PHOTO_FROM_RADIUS',
    payload: array
  };
};

export const imageIsFetched = (boolean) => {
  return {
    type: 'IMAGE_ISFETCHED',
    payload: boolean
  };
};

export const currentIsFetched = (boolean) => {
  return {
    type: 'CURRENT_ISFETCHED',
    payload: boolean
  };
};

export const mapPhotoIsFetched = (boolean) => {
  return {
    type: 'MAP_PHOTO_ISFETCHED',
    payload: boolean
  };
};