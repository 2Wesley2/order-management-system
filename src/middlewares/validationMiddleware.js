const { body, validationResult } = require('express-validator');

exports.validateOrder = [
  body('customerName')
    .trim()
    .isString().withMessage('Customer name must be a string')
    .notEmpty().withMessage('Customer name is required'),
  body('quantity')
    .isInt({ min: 1 }).withMessage('Quantity must be an integer greater than 0'),
  body('product')
    .trim()
    .isString().withMessage('Product name must be a string')
    .notEmpty().withMessage('Product name is required'),
  body('unitPrice')
    .isFloat({ min: 0 }).withMessage('Unit price must be a positive number'),
  body('hasDeliveryFee')
    .isBoolean().withMessage('hasDeliveryFee must be a boolean'),
  body('deliveryFee')
    .optional()
    .isFloat({ min: 0 }).withMessage('Delivery fee must be a positive number'),
  body('total')
    .isFloat({ min: 0 }).withMessage('Total must be a positive number'),
  body('status')
    .isIn(['Pending', 'Done', 'Delivered and Paid', 'Delivered and Unpaid']).withMessage('Status must be either Pending, Done, Delivered and Paid, or Delivered and Unpaid'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateOrderUpdate = [
  body('customerName')
    .optional()
    .trim()
    .isString().withMessage('Customer name must be a string'),
  body('quantity')
    .optional()
    .isInt({ min: 1 }).withMessage('Quantity must be an integer greater than 0'),
  body('product')
    .optional()
    .trim()
    .isString().withMessage('Product name must be a string'),
  body('unitPrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('Unit price must be a positive number'),
  body('hasDeliveryFee')
    .optional()
    .isBoolean().withMessage('hasDeliveryFee must be a boolean'),
  body('deliveryFee')
    .optional()
    .isFloat({ min: 0 }).withMessage('Delivery fee must be a positive number'),
  body('total')
    .optional()
    .isFloat({ min: 0 }).withMessage('Total must be a positive number'),
  body('status')
    .optional()
    .isIn(['Pending', 'Done', 'Delivered and Paid', 'Delivered and Unpaid']).withMessage('Status must be either Pending, Done, Delivered and Paid, or Delivered and Unpaid'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
