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

  decrementLikeCount(photo_id) {
    let query = `update photos set like_count = (case when like_count > 0 then (like_count - 1) else null end) where id = ${photo_id}`;

    return knex.raw(query);
  }

  removeLikeEntry(photo_id, profile_id) {

    let query = `delete from likes where photo_id = ${photo_id} and profile_id = ${profile_id}`;

    return knex.raw(query);

  }





}

module.exports = db.model('Like', Like);
module.exports.LikeQueries = new LikeQueries();