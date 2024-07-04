const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
    addTiffinToCart,
    incrementTiffinQuantity,
    decrementTiffinQuantity,
    removeTiffinFromCart
} = require('../controllers/cartController');

// Routes for cart operations
router.post('/add', auth, addTiffinToCart); // Add tiffin to cart
router.patch('/increment', auth, incrementTiffinQuantity); // Increment tiffin quantity
router.patch('/decrement', auth, decrementTiffinQuantity); // Decrement tiffin quantity
router.delete('/remove', auth, removeTiffinFromCart); // Remove tiffin from cart

module.exports = router;
