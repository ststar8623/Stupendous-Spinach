const db = require('../');
const knex = require('../knex.js');



class FollowersQueries {

  addFollower(userID, followerID) {

    let query = `insert into friends (user_id, follower_id) values (${userID}, ${followerID})`;

    return knex.raw(query);

    // INSERT INTO films (code, title, did, date_prod, kind)
    // VALUES ('T_601', 'Yojimbo', 106, DEFAULT, 'Drama');

  }

  incrementFollowerCount(userID) {

    let query = `update profiles set follower_count = (follower_count + 1) where id = ${userID}`;

    // update photos set like_count = (case when like_count > 0 then (like_count - 1) else null end) where id = ${photo_id}

    return knex.raw(query);
  }

  incrementFollowingCount(followerID) {

    let query = `update profiles set following_count = (following_count + 1) where id = ${followerID}`;

    return knex.raw(query);

  }

  getFollowers(userID) {

  }



}


module.exports.FollowersQueries = new FollowersQueries();
