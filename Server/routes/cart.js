const express = require('express');
const router = express.Router();
const {
    addDishToCart,
    getCart,
    removeDishFromCart,
    incrementDishQuantity,
    decrementDishQuantity
} = require('../controllers/cartController');

// Add dish to the cart
router.post('/add', addDishToCart);

// Get user's cart
router.get('/:userId', getCart);

// Remove dish from the cart
router.post('/remove', removeDishFromCart);

// Increment dish quantity
router.post('/increment', incrementDishQuantity);

// Decrement dish quantity
router.post('/decrement', decrementDishQuantity);

module.exports = router;
