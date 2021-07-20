let controller = require('./controllers.js');
var router = require('express').Router();
var db = require('./db.js');

router.get('/products', controller.products.get);
router.get('/products/:product_id/styles', controller.styles.get);
router.get('/products/:product_id/related', controller.related.get);

module.exports = router;