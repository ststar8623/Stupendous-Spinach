'use strict';
const express = require('express');
const router = express.Router();

router.post('/imageUpload', (req, res) => {
  // save image to db //
  console.log('req body: ', req.body);
});


// router.route('/')
//   .get((req, res) => {
//     res.status(200).send('Hello World!');
//   })
//   .post((req, res) => {
//     res.status(201).send({ data: 'Posted!' });
//   });





module.exports = router;
