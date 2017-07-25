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

    let query = `select p.display as "username", c.profile_id, c.photo_id, c.text, c.created_at, c.updated_at, p.photo as "profile_photo" from profiles p join comments c on c.profile_id = p.id where c.photo_id = ${photoID}`;

    return knex.raw(query);
  }

  

}


module.exports = db.model('Comment', Comment);
module.exports.CommentQueries = new CommentQueries();