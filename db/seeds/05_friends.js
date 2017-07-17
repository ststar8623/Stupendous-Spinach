
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('friends').del()
    .then(function () {
      // Inserts seed entries
      return knex('friends').insert([
        {id: 1, profile1_id: 1, profile2_id: 2}
      ]);
    });
};
