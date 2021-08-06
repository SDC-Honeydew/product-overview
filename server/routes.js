let controller = require('./controllers.js');
var router = require('express').Router();
var db = require('./db.js');

router.get('/', controller.products.get);
router.get('/:product_id', controller.product.get);
router.get('/:product_id/styles', controller.styles.get);
router.get('/:product_id/related', controller.related.get);

module.exports = router;