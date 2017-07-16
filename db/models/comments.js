const db = require('../');

const Comment = db.Model.extend({
  tableName: 'comments',
  profile: function() {
    return his.belongsTo('profile');
  }
});

module.exports = db.model('Comment', Comment);
