const { Client } = require('pg');

const client = new Client({
  user: 'ubuntu',
  host: 'ec2-54-164-75-75.compute-1.amazonaws.com',
  database: 'sdc',
  password: 'ubuntu',
  port: 5432,
})

client.connect();

function close() {
  return client.end()
}

module.exports = { client, close }

