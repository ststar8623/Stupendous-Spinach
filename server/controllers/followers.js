const models = require('../../db/models');
const utils = require('./lib/utils.js');

module.exports.addFollower = (userID, followerID) => {

  return models.Follower.FollowersQueries.checkIfFollowed(userID, followerID)
  .then((data) => {
    console.log('data from check if followed', data.rows);
    
    return data.rows.length > 0;

  })
  .then((data) => {
    if (data) {
      return models.Follower.FollowersQueries.addFollower(userID, followerID)
        .then((data) => {
          return models.Follower.FollowersQueries.incrementFollowerCount(userID);
        })
        .then((data) => {
          return models.Follower.FollowersQueries.incrementFollowingCount(followerID);
        });


    } else {
      return { data: 'You already followed this user'};
    }

  });

};

module.exports.removeFollower = (userID, followerID) => {
  
  return models.Follower.FollowersQueries.removeFollower(userID, followerID);
 
};