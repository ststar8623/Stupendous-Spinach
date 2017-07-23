import request from 'superagent';
import { axiosAction } from './axiosAction';
// import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from '../../../server/config/config';

const CLOUDINARY_UPLOAD_PRESET = 'spinach-flashback';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/spinach-flashback/image/upload';

export const initialImageUpload = (file, callback) => {
  let upload = request.post(CLOUDINARY_UPLOAD_URL)
    .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    .field('file', file);

  upload.end((err, response) => {
    if (err) { console.log('error from image upload action: ', err); }
    if (response.body.secure_url !== '') {
      callback(response.body.secure_url);
    }
  });
};

export const captionedImageUpload = (imageObj, callback) => {
  axiosAction('post', '/api/imageUpload', imageObj, (url) => {
    callback(url);
  });
};


/* old version
const imageUpload = (file, location, callback) => {
  let upload = request.post(CLOUDINARY_UPLOAD_URL)
    .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    .field('file', file);
  upload.end((err, response) => {

    if (err) {
      console.log('error from image upload action: ', err);
    }
    console.log('location ', location);
    let imageLocation = {
      latitude: location.latitude,
      longitude: location.longitude,
      timeStamp: location.timeStamp
    };
    
    if (response.body.secure_url !== '') {
      axiosAction('post', '/api/imageUpload', { url: response.body.secure_url, location: imageLocation }, () => {
        callback(response.body.secure_url);
      });
    }
  });
};
*/


export default captionedImageUpload;