const db = require('../');
const knex = require('../knex.js');
const Promise = require('bluebird');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  }
});

class ProfileQueries {


  getProfileData(userID) {
    let query = `select * from profiles where id = ${userID}`;

    return knex.raw(query);
  }

  getPhotosForProfile(userID) {
    let query = `select pro.first, p.*, age(current_date + current_time, p.created_at) as "age", pro.photo as "profile_photo" from photos p join profiles pro on p.profile_id = pro.id where p.profile_id = ${userID} order by created_at desc`;

    return knex.raw(query);
  }

}

module.exports = db.model('Profile', Profile);
module.exports.ProfileQueries = new ProfileQueries();
