const models = require('../../db/models');
const utils = require('./lib/utils.js');

module.exports.saveComment = (text="this is a great photo", photo_id=1, profile_id=1) => {


  return models.Comment.forge({text, photo_id, profile_id})
    .save()
    .then(() => {
      models.Photo.query().where({'id': photo_id})
        .select()
        .then((data) => {
          return data[0].comment_count;
        })
        .then((commentCount) => {

          if (commentCount === null) {
            return models.Photo.forge({id: photo_id}).save({'comment_count': 0});
          } else {
            return models.Photo.forge({id: photo_id}).save({'comment_count': commentCount + 1});
          }
        });
    });
};

module.exports.getAllComments = (photoID = 1) => {

  return new models.Comment({photo_id: photoID})
    .fetchAll()
    .then((data) => {
      return data.serialize().filter(item => item.photo_id === Number(photoID));
    });
};

//how to insert data:

// // Save with no arguments
// Model.forge({id: 5, firstName: "John", lastName: "Smith"}).save().then(function() { //...

// // Or add attributes during save
// Model.forge({id: 5}).save({firstName: "John", lastName: "Smith"}).then(function() { //...

// // Or, if you prefer, for a single attribute
// Model.forge({id: 5}).save('name', 'John Smith').then(function() { //...