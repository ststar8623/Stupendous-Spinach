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
//how to insert data:
// dont add the id it self increments 
// // Save with no arguments
// Model.forge({id: 5, firstName: "John", lastName: "Smith"}).save().then(function() { //...

// // Or add attributes during save
// Model.forge({id: 5}).save({firstName: "John", lastName: "Smith"}).then(function() { //...

// // Or, if you prefer, for a single attribute
// Model.forge({id: 5}).save('name', 'John Smith').then(function() { //...