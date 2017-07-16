const models = require('../models');

//https://stackoverflow.com/questions/28250680/how-do-i-access-previous-promise-results-in-a-then-chain
// please dont mess with this file 
// if you need example to populate the tables use Knex syntax in in the numbered files above


exports.seed = function (knex, Promise) {
 
  return models.Profile.where({ email: 'admin@domain.com' }).fetch().bind({})
    .then((profile) => {
      if (profile) {
        throw profile;
      }
      return models.Profile.forge({
        first: 'AdSara',
        last: 'Addaqiq',
        display: 'Administrator',
        email: 'admin@domain.com'
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create profile');
      throw err;
    })

    .then((profile) => {
      this.profile = profile;
      return models.Auth.forge({
        type: 'local',
        password: 'admin123123',
        profile_id: profile.get('id')
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create auth');
    })

    .then((profile) => {
      return models.Photo.forge({
        profile_id: profile.get('id'),
        latitude: '12345',
        longitude: '4653453',
        url: '/sfs/sfsf/sdf',
        like_count: 5,
        caption: 'this is cool',
        comment_count: 5 
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create photo');
    })

    .then((photo) => {
      return models.Comment.forge({
        profile_id: this.profile.get('id'),
        photo_id: photo.get('id'),
        text: 'check the profiles '
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create photo');
    })

    .then((photo) => {
      return models.Like.forge({
        photo_id: photo.get('id'),
        profile_id: this.profile.get('id')
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create photo');
    })

    .then((photo) => {
      return models.Friend.forge({
        profile1_id: this.profile.get('id'),
        profile2_id: photo.get('profile_id')
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create photo');
    })
    .catch(() => {
      console.log('WARNING: defualt user already exists.');
    });

};
