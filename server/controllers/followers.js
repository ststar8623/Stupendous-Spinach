const models = require('../../db/models');
const utils = require('./lib/utils.js');

module.exports.addFollower = (userID, followerID) => {

 return models.Follower.FollowersQueries.addFollower(userID, followerID)
    .then((data) => {
      return models.Follower.FollowersQueries.incrementFollowerCount(userID);
    })
    .then((data) => {
      return models.Follower.FollowersQueries.incrementFollowingCount(followerID);
    });

};

module.exports.getFollowers = (userID) => {
  
 
};