let models = require('./models.js');
let db = require('./db.js');

let products = {
  get: (req, res) => {

    return models.products.getAll()
      .then((products) => {
        res.status(200).send(products);
      })
      .catch((err) => {
        console.log('Error getting products', err);
        res.send(err);
      })
  }
}

let product = {
  get: (req, res) => {
    let productId = req.params.product_id;
    return models.product.get(productId)
      .then((product) => {
        res.status(200).send(product);
      })
      .catch((err) => {
        console.log('Error getting styles', err);
        res.send(err);
      })
  }
}

let styles = {
  get: (req, res) => {
    let productId = req.params.product_id;
    return models.styles.getAll(productId)
      .then((styles) => {
        styles.results.forEach((style) => {
          style.skus = style.skus.reduce((acc, current) => {
            let skuId = current.id
            acc[skuId] = {
              size: current.size,
              quantity: current.quantity
            }
            return acc;
          }, {})
        })
        res.status(200).send(styles);
      })
      .catch((err) => {
        console.log('Error getting styles', err);
        res.send(err);
      })
  }
}

let related = {
  get: (req, res) => {
    let productId = req.params.product_id;
    return models.related.getAll(productId)
      .then((related) => {
        let data = related.map((current) => current.related_product_id);
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log('Error getting styles', err);
        res.send(err);
      })
  }
}

module.exports = {
  products,
  product,
  styles,
  related
}