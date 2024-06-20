const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  quantity: { type: Number, required: true },
  product: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  hasDeliveryFee: { type: Boolean, required: true },
  deliveryFee: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Done', 'Delivered and Paid', 'Delivered and Unpaid'], required: true }
}, { timestamps: true });

orderSchema.index({ customerName: 1 });
orderSchema.index({ status: 1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
