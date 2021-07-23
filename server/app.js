const express = require('express');
const router = require('./routes.js');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello hello!')
})

app.use('/products', router);



module.exports = app;