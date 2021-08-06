const request = require('supertest');
const app = require('../server/app.js');
const client = require('../server/db.js');

describe('api', () => {

  describe('get /products', () => {
    it('should return a 200', async () => {
      const response = await request(app).get('/products');
      expect(response.status).toBe(200);
    });

    it('should respond with an array of 10', async () => {
      const response = await request(app).get('/products');
      expect(response.body.length).toEqual(10);
    });
  });

  describe('get /products/:product_id/styles', () => {
    it('should return a 200', async () => {
      const response = await request(app).get('/products/:product_id/styles');
      expect(response.status).toBe(200);
    });
  });

  describe('get /products/:product_id/related', () => {
    it('should return a 200', async () => {
      const response = await request(app).get('/products/:product_id/related');
      expect(response.status).toBe(200);
    });
  });


});