const db = require('../');

const Like = db.Model.extend({
  tableName: 'likes',
  profile: function() {
    return this.belongsTo('profile');
  }
});

module.exports = db.model('Like', Like);
