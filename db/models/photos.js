const db = require('../');
const knex = require('../knex.js');

const Photo = db.Model.extend({
  tableName: 'photos',
  profile: function() {
    return this.belongsTo('profile');
  }
});

class PhotoQueries {


  getPhotoLikesForUser(userID) {
    let query = `select * from likes where profile_id = ${userID}`;

    return knex.raw(query);
  }

  getTwentyPhotos() {
    let query = `select * from photos order by created_at desc limit 20;`;

    return knex.raw(query);

  }

}

// PhotoQueries.getPhotoLikesForUser(2)
// .then((data) => console.log(data));


module.exports = db.model('Photo', Photo);
module.exports.PhotoQueries = new PhotoQueries();
