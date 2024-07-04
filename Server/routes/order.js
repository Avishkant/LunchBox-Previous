const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
    getUserOrders,
    getUserPastOrders,
    getProviderOrders,
    getProviderPastOrders,
    updateOrderStatus
} = require('../controllers/orderController');

// Routes for user
router.get('/user/orders', auth, getUserOrders);
router.get('/user/past-orders', auth, getUserPastOrders);

// Routes for provider
router.get('/provider/orders', auth, getProviderOrders);
router.get('/provider/past-orders', auth, getProviderPastOrders);
router.patch('/provider/orders/:id/status', auth, updateOrderStatus);  // New route for updating order status

module.exports = router;
