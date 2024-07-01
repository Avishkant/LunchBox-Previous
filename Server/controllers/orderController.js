const Cart = require('../models/Cart');
const Order = require('../models/Order');
const User = require('../models/User');

// Create an order from the cart
exports.createOrder = async (req, res) => {
  const { userId, tiffinProviderId, paymentMethod } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    const order = new Order({
      user: userId,
      tiffinProvider: tiffinProviderId,
      items: cart.items,
      totalPrice,
      paymentMethod,
    });

    await order.save();

    // Clear the user's cart after order is placed
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get ongoing orders
exports.getOngoingOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const ongoingOrders = await Order.find({ user: userId, status: { $ne: 'Delivered' } }).populate('items');
    res.status(200).json(ongoingOrders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get past orders
exports.getPastOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const pastOrders = await Order.find({ user: userId, status: 'Delivered' }).populate('items');
    res.status(200).json(pastOrders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
