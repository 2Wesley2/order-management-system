const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Order = require('../models/orderModel');
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
  await Order.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Order Controller', () => {
  it('should create a new order', async () => {
    const req = {
      body: {
        customerName: 'John Doe',
        quantity: 2,
        product: 'Product A',
        unitPrice: 50,
        hasDeliveryFee: true,
        deliveryFee: 10,
        total: 110,
        status: 'Pending'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    const responseData = res.json.mock.calls[0][0];
    expect(responseData.customerName).toBe('John Doe');
    expect(responseData.quantity).toBe(2);
    expect(responseData.product).toBe('Product A');
    expect(responseData.unitPrice).toBe(50);
    expect(responseData.hasDeliveryFee).toBe(true);
    expect(responseData.deliveryFee).toBe(10);
    expect(responseData.total).toBe(110);
    expect(responseData.status).toBe('Pending');
    expect(responseData._id).toBeDefined();
    expect(responseData.__v).toBeDefined();
    expect(responseData.createdAt).toBeDefined();
    expect(responseData.updatedAt).toBeDefined();
  });

  it('should get all orders', async () => {
    await Order.insertMany([
      { customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' },
      { customerName: 'Jane Doe', quantity: 1, product: 'Product B', unitPrice: 30, hasDeliveryFee: false, deliveryFee: 0, total: 30, status: 'Pending' }
    ]);

    const req = { query: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getAllOrders(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const responseData = res.json.mock.calls[0][0];
    expect(responseData.orders).toHaveLength(2);
    expect(responseData.orders[0].customerName).toBeDefined();
    expect(responseData.orders[0].quantity).toBeDefined();
    expect(responseData.orders[0].product).toBeDefined();
    expect(responseData.orders[0].unitPrice).toBeDefined();
    expect(responseData.orders[0].hasDeliveryFee).toBeDefined();
    expect(responseData.orders[0].deliveryFee).toBeDefined();
    expect(responseData.orders[0].total).toBeDefined();
    expect(responseData.orders[0].status).toBeDefined();
    expect(responseData.orders[0]._id).toBeDefined();
    expect(responseData.orders[0].__v).toBeDefined();
    expect(responseData.orders[0].createdAt).toBeDefined();
    expect(responseData.orders[0].updatedAt).toBeDefined();
  });

  it('should get an order by ID', async () => {
    const order = new Order({ customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' });
    await order.save();

    const req = { params: { id: order._id.toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getOrderById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const responseData = res.json.mock.calls[0][0];
    expect(responseData._id.toString()).toBe(order._id.toString());
    expect(responseData.customerName).toBe('John Doe');
    expect(responseData.product).toBe('Product A');
    expect(responseData.quantity).toBe(2);
    expect(responseData.unitPrice).toBe(50);
    expect(responseData.hasDeliveryFee).toBe(true);
    expect(responseData.deliveryFee).toBe(10);
    expect(responseData.total).toBe(110);
    expect(responseData.status).toBe('Pending');
    expect(responseData.__v).toBeDefined();
    expect(responseData.createdAt).toBeDefined();
    expect(responseData.updatedAt).toBeDefined();
  });

  it('should update an order', async () => {
    const order = new Order({ customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' });
    await order.save();

    const req = {
      params: { id: order._id.toString() },
      body: { status: 'Done' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await updateOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const responseData = res.json.mock.calls[0][0];
    expect(responseData._id.toString()).toBe(order._id.toString());
    expect(responseData.status).toBe('Done');
    expect(responseData.customerName).toBe('John Doe');
    expect(responseData.product).toBe('Product A');
    expect(responseData.quantity).toBe(2);
    expect(responseData.unitPrice).toBe(50);
    expect(responseData.hasDeliveryFee).toBe(true);
    expect(responseData.deliveryFee).toBe(10);
    expect(responseData.total).toBe(110);
    expect(responseData.__v).toBeDefined();
    expect(responseData.createdAt).toBeDefined();
    expect(responseData.updatedAt).toBeDefined();
  });

  it('should delete an order', async () => {
    const order = new Order({ customerName: 'John Doe', quantity: 2, product: 'Product A', unitPrice: 50, hasDeliveryFee: true, deliveryFee: 10, total: 110, status: 'Pending' });
    await order.save();

    const req = { params: { id: order._id.toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await deleteOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Order successfully deleted' });
  });
});
