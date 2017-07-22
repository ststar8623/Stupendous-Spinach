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

};

module.exports.removeLike = (photo_id, profile_id) => {

  return models.Like.LikeQueries.decrementLikeCount(photo_id)
    .then(() => {
      return models.Like.LikeQueries.removeLikeEntry(photo_id, profile_id);
    });

};