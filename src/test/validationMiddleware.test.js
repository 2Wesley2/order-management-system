const request = require('supertest');
const express = require('express');
const { validateOrder } = require('../middlewares/validationMiddleware');
const app = express();
app.use(express.json());

app.post('/order', validateOrder, (req, res) => {
  res.status(200).json({ message: 'Order is valid' });
});

describe('Validation Middleware', () => {
  it('should fail if customerName is missing', async () => {
    const res = await request(app)
      .post('/order')
      .send({
        quantity: 2,
        product: 'Product A',
        unitPrice: 50,
        hasDeliveryFee: true,
        deliveryFee: 10,
        total: 110,
        status: 'Pending'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].msg).toEqual('Customer name is required');
  });

  it('should fail if quantity is missing', async () => {
    const res = await request(app)
      .post('/order')
      .send({
        customerName: 'John Doe',
        product: 'Product A',
        unitPrice: 50,
        hasDeliveryFee: true,
        deliveryFee: 10,
        total: 110,
        status: 'Pending'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].msg).toEqual('Quantity must be an integer greater than 0');
  });

  it('should fail if product is missing', async () => {
    const res = await request(app)
      .post('/order')
      .send({
        customerName: 'John Doe',
        quantity: 2,
        unitPrice: 50,
        hasDeliveryFee: true,
        deliveryFee: 10,
        total: 110,
        status: 'Pending'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].msg).toEqual('Product name is required');
  });

  it('should fail if unitPrice is missing', async () => {
    const res = await request(app)
      .post('/order')
      .send({
        customerName: 'John Doe',
        quantity: 2,
        product: 'Product A',
        hasDeliveryFee: true,
        deliveryFee: 10,
        total: 110,
        status: 'Pending'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].msg).toEqual('Unit price must be a positive number');
  });

  it('should fail if hasDeliveryFee is missing', async () => {
    const res = await request(app)
      .post('/order')
      .send({
        customerName: 'John Doe',
        quantity: 2,
        product: 'Product A',
        unitPrice: 50,
        deliveryFee: 10,
        total: 110,
        status: 'Pending'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].msg).toEqual('hasDeliveryFee must be a boolean');
  });

  it('should fail if total is missing', async () => {
    const res = await request(app)
      .post('/order')
      .send({
        customerName: 'John Doe',
        quantity: 2,
        product: 'Product A',
        unitPrice: 50,
        hasDeliveryFee: true,
        deliveryFee: 10,
        status: 'Pending'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].msg).toEqual('Total must be a positive number');
  });

  it('should fail if status is invalid', async () => {
    const res = await request(app)
      .post('/order')
      .send({
        customerName: 'John Doe',
        quantity: 2,
        product: 'Product A',
        unitPrice: 50,
        hasDeliveryFee: true,
        deliveryFee: 10,
        total: 110,
        status: 'Invalid Status'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].msg).toEqual('Status must be either Pending, Done, Delivered and Paid, or Delivered and Unpaid');
  });

  it('should pass with valid data', async () => {
    const res = await request(app)
      .post('/order')
      .send({
        customerName: 'John Doe',
        quantity: 2,
        product: 'Product A',
        unitPrice: 50,
        hasDeliveryFee: true,
        deliveryFee: 10,
        total: 110,
        status: 'Pending'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Order is valid');
  });
});
