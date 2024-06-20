const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const orderRoutes = require('../routes/orderRoutes');
const Order = require('../models/orderModel');

const app = express();
app.use(express.json());
app.use('/api/orders', orderRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
  await Order.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Order Routes', () => {
  it('should create a new order', async () => {
    const res = await request(app)
      .post('/api/orders')
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

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('customerName', 'John Doe');
  });

  it('should get all orders', async () => {
    await Order.insertMany([
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' },
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' },
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' },
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' },
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' },
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' },
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' },
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' },
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' },
      { customerName: 'Alice Smith', quantity: 3, product: 'Product C', unitPrice: 20, hasDeliveryFee: true, deliveryFee: 5, total: 65, status: 'Done' },
      { customerName: 'Bob Brown', quantity: 4, product: 'Product D', unitPrice: 15, hasDeliveryFee: false, deliveryFee: 0, total: 60, status: 'Delivered and Paid' },
      { customerName: 'Charlie Black', quantity: 5, product: 'Product E', unitPrice: 10, hasDeliveryFee: true, deliveryFee: 2, total: 52, status: 'Delivered and Unpaid' }
    ]);

    const res = await request(app).get('/api/orders');

    expect(res.statusCode).toEqual(200);
    expect(res.body.orders).toHaveLength(10);
    expect(res.body.orders).toEqual(expect.arrayContaining([
      expect.objectContaining({ customerName: 'John Doe' }),
      expect.objectContaining({ customerName: 'Jane Doe' }),
      expect.objectContaining({ customerName: 'Alice Smith' }),
      expect.objectContaining({ customerName: 'Bob Brown' }),
      expect.objectContaining({ customerName: 'Charlie Black' })
    ]));
  });

  it('should get an order by ID', async () => {
    const order = new Order({ customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' });
    await order.save();

    const res = await request(app).get(`/api/orders/${order._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', order._id.toString());
    expect(res.body).toHaveProperty('customerName', 'John Doe');
  });

  it('should update an order', async () => {
    const order = new Order({ customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' });
    await order.save();

    const res = await request(app)
      .put(`/api/orders/${order._id}`)
      .send({ status: 'Done' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', order._id.toString());
    expect(res.body).toHaveProperty('status', 'Done');
  });

  it('should delete an order', async () => {
    const order = new Order({ customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' });
    await order.save();

    const res = await request(app).delete(`/api/orders/${order._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Order successfully deleted');
  });
});
