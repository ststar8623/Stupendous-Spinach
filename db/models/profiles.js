const db = require('../');
const Promise = require('bluebird');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  }
});

class ProfileQueries {


  getProfileData(userID, reqID) {
    //all profile data
    //array of images for this user
    // let query = `select `;

    // return knex.raw(query);
  }



}

module.exports = db.model('Profile', Profile);
module.exports.ProfileQueries = new ProfileQueries();
