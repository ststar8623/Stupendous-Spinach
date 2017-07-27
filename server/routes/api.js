'use strict';
const express = require('express');
const router = express.Router();
const PhotosController = require('../controllers').Photos;
const CommentsController = require('../controllers').Comments;
const LikesController = require('../controllers').Likes;
const ProfilesController = require('../controllers').Profiles;
const axios = require('axios');
const geocluster = require('geocluster');


router.post('/imageUpload', (req, res) => {
  
  const { url } = req.body;
  const { latitude, longitude } = req.body.location;
  const { caption } = req.body;
  const { shareSelection } = req.body; //currently unused
  
  //save url, lat, long to database

  PhotosController.savePhoto({ latitude, longitude, url, profile_id: req.user.id, caption })
    .then((data) => {
      //upon success, send URL back to client
      res.status(201).send(url);
    })
    .catch((error) => {
      res.status(500).send("Sorry, your photo failed to upload");
    });

});


router.post('/nearbyPhotos', (req, res) => {
  
  let coordinates;

  if (req.body.location) {
    coordinates = req.body.location;
  } else {
    coordinates = {latitude: 37.8837339, longitude: -122.5090785};
  }

  PhotosController.getNearbyPhotos(coordinates, req.user.id, req.body.max, 10)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((data) => {
      //send empty object if error
      res.status(400).send([]);
    });
});

router.post('/mapPhotos/:radius/', (req, res) => {

  let coordinates;

  if (req.body.location) {
    coordinates = req.body.location;
  } else {
    coordinates = {latitude: 37.8837339, longitude: -122.5090785};
  }

  PhotosController.getNearbyPhotos(coordinates, req.user.id, undefined, req.params.radius)
    .then((data) => {
      // console.log('data from database ', data);
      return axios.post('https://powerful-oasis-62289.herokuapp.com/cluster', { data }).then(response => {
        // console.log('data from cluster API ==========================>>>>>>> ', JSON.stringify(response.data));
        // res.status(200).send(response.data);
        return response.data;
      // }).error(err => console.log('err ', err));
      });
      // res.status(200).send(data);
    })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((error) => {
      //send empty object if error
      res.status(400).send([]);
    });
});


router.post('/saveComment/:photoID', (req, res) =>{
  const userID = req.user ? req.user.id : 1;

  CommentsController.saveComment(req.body.text, req.params.photoID, userID)
    .then((data)=> {
      res.status(200).send('Successfully saved your comment');
    })
    .catch((error) => {
      res.status(400).send('Something went wrong with saving your comment');
    });
});


router.post('/addlike/:photoID', (req, res) => {

  LikesController.addLike(req.params.photoID, req.user.id)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      //send empty object if error
      res.status(400).send("Sorry something went wrong with saving your like");
    });
});

router.put('/removelike/:photoID', (req, res) => {
  
  const userID = req.user ? req.user.id : 2;

  LikesController.removeLike(req.params.photoID, userID)
    .then((data) => {
      res.status(200).send('Successfully removed like');
    })
    .catch((error) => {
      res.status(400).send('Sorry, something went wrong with your delete like request');
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

router.put('/removeComment/:commentID', (req, res) =>{

  CommentsController.removeComment(req.params.commentID)
    .then((data) => {
      res.status(200).send("Successfully removed commentt");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get('/profilepage/:profileID', (req, res) => {

  ProfilesController.getProfile(req.params.profileID, req.user.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.post('/cluster', (req, res) => {

  const array = req.body.data;

  axios.post('https://powerful-oasis-62289.herokuapp.com/cluster', { data: array }).then(res => {
    console.log('result from server ', res.data);
  }).error(err => console.log('err ', err));

});

module.exports = router;
