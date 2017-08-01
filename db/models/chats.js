const db = require('../');
const knex = require('../knex.js');

class ChatsQueries {


  saveMessages(text, sendId, receiveId) {
    let query = `insert into chats (text, send_id, receive_id) values ('${text}', ${sendId}, ${receiveId})`;
    return knex.raw(query);
  }

  fetchMessages(sendId, receiveId) {
    let query = `select c.*, p.first as "send_first", p.photo as "send_photo", p2.first as "receive_first", p2.photo as "receive_photo" from chats c join profiles p on c.send_id = p.id join profiles p2 on c.receive_id = p2.id where c.send_id = ${sendId} and c.receive_id = ${receiveId} or c.send_id = ${receiveId} and c.receive_id = ${sendId}`;
    
    return knex.raw(query);
  }
}

module.exports.ChatsQueries = new ChatsQueries();