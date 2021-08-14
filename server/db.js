const { Client } = require('pg');

const client = new Client();
client.connect();

function close() {
  return client.end()
}

module.exports = { client, close }