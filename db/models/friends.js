const db = require('../');

const Friend = db.Model.extend({
  tableName: 'friends',
  profile: function() {
    return this.belongsTo('profile');
  }
});

module.exports = db.model('Friend', Friend);