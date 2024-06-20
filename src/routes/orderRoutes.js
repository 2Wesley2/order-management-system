const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');
const { validateOrder, validateOrderUpdate } = require('../middlewares/validationMiddleware');

router.post('/', validateOrder, createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', validateOrderUpdate, updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
