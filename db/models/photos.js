const db = require('../');

const Photo = db.Model.extend({
  tableName: 'photos',
  profile: function() {
    return this.belongsTo('profile');
  }
});

module.exports = db.model('Photo', Photo);
