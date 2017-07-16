
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {id: 1, profile_id: 1, photo_id: 1, text: 'SF nights are dope'}
      ]);
    });
};
