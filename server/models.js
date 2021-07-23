let db = require('./db.js');

let products = {
  getAll: () => {
    return db.query('SELECT * FROM product WHERE id <= 10')
      .then(res => res.rows)
      .catch(e => console.error(e.stack))
  }
}

module.exports = { products };