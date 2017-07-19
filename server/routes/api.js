'use strict';
const express = require('express');
const router = express.Router();
const PhotosCrontoller = require('../controllers').Photos;


//end point that stores photo URL, curre location, userID
router.post('/imageUpload', (req, res) => {
  
  const { url } = req.body;
  const { latitude, longitude } = req.body.location;
  
  //save url, lat, long to database
  //todo: include profile id
  PhotosCrontoller.savePhoto({ 'latitude': latitude, 'longitude': longitude, 'url': url}, req, res);

});




module.exports = router;
