const models = require('../../db/models');
const utils = require('./lib/utils.js');
const knex = require('../../db/knex.js');

module.exports.saveMessages = ({ text, sendId, receiveId }) => {
  return models.Chats.ChatsQueries.saveMessages(text, sendId, receiveId)
    .then(data => {
      console.log('Message saved');
    });
};

module.exports.fetchMessages = ({ sendId, receiveId }) => {

  return models.Chats.ChatsQueries.fetchMessages(sendId, receiveId)
    .then((data) => {
      return data.rows;
    });
};
  
//how to insert data:

// // Save with no arguments
// Model.forge({id: 5, firstName: "John", lastName: "Smith"}).save().then(function() { //...

// // Or add attributes during save
// Model.forge({id: 5}).save({firstName: "John", lastName: "Smith"}).then(function() { //...

// // Or, if you prefer, for a single attribute
// Model.forge({id: 5}).save('name', 'John Smith').then(function() { //...