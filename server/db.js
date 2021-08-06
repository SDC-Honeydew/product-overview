const { Client } = require('pg');
const connectionString = 'postgres://aboussarath:password@localhost:5432/mydb';

const client = new Client({
  connectionString,
});

client.connect();

function close() {
  return client.end()
}

module.exports = { client, close }