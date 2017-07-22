const db = require('../');
const knex = require('../knex.js');



const Like = db.Model.extend({
  tableName: 'likes',
  profile: function() {
    return this.belongsTo('profile');
  }
});

class LikeQueries {


  isLikedByUser(photo_id, profile_id) {
    let query = `select count(*) from likes where photo_id = ${photo_id} AND profile_id = ${profile_id}`;

    return knex.raw(query)
      .then((data) => {
        return data.rows[0].count > 0;
      });
  }



}

module.exports = db.model('Like', Like);
module.exports.LikeQueries = new LikeQueries();