const db = require('../');
const knex = require('../knex.js');

class ChatsQueries {


  saveMessages(text, send_id, receive_id) {
    let query = `insert into chats (text, send_id, receive_id) values ('${text}', ${send_id}, ${receive_id})`;
    return knex.raw(query);
  }

  fetchMessages(send_id, receive_id) {
    let query = `select c.*, p.first as "send_first", p.photo as "send_photo", p2.first as "receive_first", p2.photo as "receive_photo" from chats c join profiles p on c.send_id = p.id join profiles p2 on c.receive_id = p2.id where c.send_id = ${send_id} and c.receive_id = ${receive_id} or c.send_id = ${receive_id} and c.receive_id = ${send_id}`;
    
    return knex.raw(query);
  }
}

module.exports.ChatsQueries = new ChatsQueries();