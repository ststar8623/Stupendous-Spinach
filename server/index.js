'use strict';
const app = require('./app');
const db = require('../db');
const config = require('config')['knex'];
const PORT = process.env.PORT || 3000;

console.log('the current environment is: ', app.get('env'));


app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});
