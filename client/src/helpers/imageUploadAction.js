import request from 'superagent';
import axios from 'axios';

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

export const captionedImageUpload = (object, callback) => {
  axios.post('/api/imageUpload', object)
    .then((res) => {
      callback(res);
    });
};

export default captionedImageUpload;