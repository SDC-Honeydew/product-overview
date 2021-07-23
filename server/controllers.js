let models = require('./models.js');
let db = require('./db.js');

let products = {
  get: (req, res) => {

    return models.products.getAll()
    .then((products) => {
      console.log('controller products', products);
      res.status(200).send(products);
    })
    .catch((err) => {
      res.send(err);
    })
  }
}

let styles = {
  get: (req, res) => {
    res.send('get the styles')
  }
}

let related = {
  get: (req, res) => {
    res.send('get the related products')
  }
}

module.exports = {
  products,
  styles,
  related
}