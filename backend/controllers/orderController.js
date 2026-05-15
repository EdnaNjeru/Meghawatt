const Order = require('../models/orderModel');

const orders = [];

exports.createOrder = (req, res) => {
  const order = {
    id: orders.length + 1,
    ...req.body,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  console.log('Order Received:', order);
  res.status(201).json({ message: 'Order logged in system', order });
};

exports.getOrders = (req, res) => {
  res.json({ orders });
};
