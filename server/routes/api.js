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


router.get('/nearbyPhotos', (req, res) => {

  let example = [ {id: 1, profile_id: 1, latitude: '37.7876° N', longitude: '122.4001° W', url: 'http://img07.deviantart.net/a85d/i/2013/022/0/3/san_francisco_city_by_tt83x-d5seu41.jpg', like_count: 1, comment_count: 1, caption: 'SF at night!' },

    {id: 2, profile_id: 2, latitude: '37.8080° N', longitude: '122.4177° W', url: 'http://usa.sae.edu/assets/Campuses/San-Francsico/2015/San_Francisco_city_view.jpg', like_count: 2, comment_count: 5, caption: 'another view of the city'}
  ];
  
  res.status(200).send(example);

});




module.exports = router;
