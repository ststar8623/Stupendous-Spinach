const db = require('../');
const knex = require('../knex.js');


const Comment = db.Model.extend({
  tableName: 'comments',
  profile: function() {
    return his.belongsTo('profile');
  }
});

class CommentQueries {


  getAllCommentsForPhoto(photoID) {

    let query = `select c.id as "comment_id", p.display as "username", c.profile_id, c.photo_id, c.text, c.created_at, c.updated_at, p.photo as "profile_photo" from profiles p join comments c on c.profile_id = p.id where c.photo_id = ${photoID} order by c.created_at asc`;

    return knex.raw(query);
  }

  removeComment(commentID) {
    let query = `delete from comments where id = ${commentID}`;
    
    return knex.raw(query);
  }

  decrementCommentCount(commentID) {

    let photoIDQuery = `select photo_id from comments where id = ${commentID}`;


    return knex.raw(photoIDQuery)
      .then((data) => {
        let query = `update photos set comment_count = (case when comment_count > 0 then (comment_count - 1) else null end) where id = ${data.rows[0].photo_id}`;
        return knex.raw(query);
      });

  }


}


module.exports = db.model('Comment', Comment);
module.exports.CommentQueries = new CommentQueries();