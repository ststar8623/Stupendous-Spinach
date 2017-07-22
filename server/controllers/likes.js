const models = require('../../db/models');
const utils = require('./lib/utils.js');


module.exports.addLike = (photo_id, profile_id) => {

  //check if user already liked photo

  return models.Like.LikeQueries.isLikedByUser(photo_id, profile_id)
    .then((isLiked) => {
    
      if (isLiked) {

        return { savedLiked: false };

      } else {
        return models.Like.forge({photo_id, profile_id})
          .save()
          .then(() => {
            return models.Photo.query().where({'id': photo_id})
              .select()
              .then((data2) => {
                return data2[0].like_count;
              })
              .then((likeCount) => {
                if (likeCount === null ) {
                  return models.Photo.forge({id: photo_id}).save({'like_count': 1})
                    .then(() => {
                      return { savedLiked: true};
                    });
                } else {
                  return models.Photo.forge({id: photo_id}).save({'like_count': likeCount + 1})
                    .then(() => {
                      return { savedLiked: true};
                    });
                }
              });
          });
      }
    });


  
  // check if the photo id an the user id already exist 
  // return models.Like.forge({photo_id, profile_id})
  //   .save()
  //   .then(() => {
  //     return models.Photo.query().where({'id': photo_id})
  //       .select()
  //       .then((data2) => {
  //         return data2[0].like_count;
  //       })
  //       .then((likeCount) => {
  //         if (likeCount === null ) {
  //           return models.Photo.forge({id: photo_id}).save({'like_count': 1});
  //         } else {
  //           return models.Photo.forge({id: photo_id}).save({'like_count': likeCount + 1});
  //         }
  //       });
  //   });
};
//how to insert data:
// dont add the id it self increments 
// // Save with no arguments
// Model.forge({id: 5, firstName: "John", lastName: "Smith"}).save().then(function() { //...

// // Or add attributes during save
// Model.forge({id: 5}).save({firstName: "John", lastName: "Smith"}).then(function() { //...

// // Or, if you prefer, for a single attribute
// Model.forge({id: 5}).save('name', 'John Smith').then(function() { //...