const { Client } = require('pg');
const connectionString = 'postgres://aboussarath:password@localhost:5432/mydb';

const client = new Client({
  connectionString,
});

client.connect();


module.exports = client