
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('auths').del()
    .then(function () {
      // Inserts seed entries
      return knex('auths').insert([
        {id: 1, type: 'local', password: '1234556', profile_id: 1}
      ]);
    });
};
