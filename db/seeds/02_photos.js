
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('photos').del()
    .then(function () {
      // Inserts seed entries.  , 
      return knex('photos').insert([
        {id: 1, profile_id: 1, latitude: '37.7876° N', longitude: '122.4001° W', url: 'http://img07.deviantart.net/a85d/i/2013/022/0/3/san_francisco_city_by_tt83x-d5seu41.jpg', like_count: 1, comment_count: 1, caption: 'SF at night!' }
      ]);
    });
};