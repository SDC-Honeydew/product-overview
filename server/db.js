const { Pool } = require('pg');

const pool = new Pool()

pool.connect();

function close() {
  return pool.end()
}

module.exports = { pool, close }

