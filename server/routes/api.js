'use strict';
const express = require('express');
const router = express.Router();
const PhotosCrontoller = require('../controllers').Photos;


router.post('/imageUpload', (req, res) => {
  
  const { url } = req.body;
  const { latitude, longitude } = req.body.location;
  
  //save url, lat, long to database
  //todo: include profile id
  PhotosCrontoller.savePhoto({ latitude, longitude, url, profile_id: req.user.id }, req, res);

});


router.post('/nearbyPhotos', (req, res) => {
  PhotosCrontoller.getNearbyPohotos(req.body.location.coords)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((data) => {
      //send empty object if error
      res.status(400).send([]);
    });
});




module.exports = router;
