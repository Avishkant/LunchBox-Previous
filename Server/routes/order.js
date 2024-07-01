const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/create', orderController.createOrder);
router.get('/ongoing/:userId', orderController.getOngoingOrders);
router.get('/past/:userId', orderController.getPastOrders);

module.exports = router;
