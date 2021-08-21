const { Pool } = require('pg');

const pool = new Pool({
  user: 'ubuntu',
  host: '54.167.251.57',
  database: 'sdc',
  password: 'ubuntu',
  port: 5432,
})

pool.connect();

function close() {
  return pool.end()
}

module.exports = { pool, close }

