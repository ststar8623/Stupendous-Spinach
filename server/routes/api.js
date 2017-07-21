'use strict';
const express = require('express');
const router = express.Router();
const PhotosController = require('../controllers').Photos;
const CommentsController = require('../controllers').Comments;


router.post('/imageUpload', (req, res) => {
  
  const { url } = req.body;
  const { latitude, longitude } = req.body.location;
  
  //save url, lat, long to database

  PhotosController.savePhoto({ latitude, longitude, url, profile_id: req.user.id })
    .then(() => {
      //upon success, send URL back to client
      res.status(201).send(url);
    })
    .catch(() => {
      res.status(500).send("Sorry, your photo failed to uploaded");
    });

});


router.post('/nearbyPhotos', (req, res) => {
  PhotosController.getNearbyPohotos(req.body.location.coords)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((data) => {
      //send empty object if error
      res.status(400).send([]);
    });
});



router.post('/saveComment/:photoID', (req, res) =>{

  console.log('user id', req.user);
  const userID = req.user ? req.user.id : 1;

  CommentsController.saveComment(req.body.text, req.params.photoID, userID)
    .then(()=> {
      res.status(200).send('Successfully saved your comment');
    })
    .catch(() => {
      res.status(400).send('Something went wrong with saving your comment');
    });
});


router.post('/addlike', (req, res) => {
  console.log(req.body.photoId);
  console.log(req.user.id);

  PhotosController.addLike (req.body.photoId, req.user.id)
    .then((data) => {
      console.log(data.attributes);
      res.status(201).send(data.attributes);
    })
    .catch((error) => {
      console.log(error);
      //send empty object if error
      res.status(400).send([]);
    });
});


router.get('/getAllComments/:photoID', (req, res) =>{
  CommentsController.getAllComments(req.params.photoID)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = router;
