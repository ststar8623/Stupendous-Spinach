
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('likes').del()
    .then(function () {
      // Inserts seed entries
      return knex('likes').insert([
        {id: 1, photo_id: 1, profile_id: 2 }
      ]);
    });
};
