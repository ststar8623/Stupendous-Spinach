//knex seed:make <file name> : make file
//knex seed:run
//knex migrate:latest to make the tables
// knex migrate:rollback to delect all tables
// dropdb <thesis_devel> to drop the database
//grunt pgcreatedb:default make the database
//


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert([
        {id: 1, first: 'Sara', last: 'Daqiq', display: null, email: 'sadaqiq@gmail.com', phone: null},
        {id: 2, first: 'NotSara', last: 'NotDaqiq', display: null, email: 'NOTsadaqiq@gmail.com', phone: null}
      ]);
    });
};
