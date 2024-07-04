const express = require('express');
const { auth } = require('../middleware/auth');
const { createTiffin, updateTiffin, deleteTiffin, getTiffinsByCity, addToCart } = require('../controllers/tiffinController');

const router = express.Router();

router.post('/create', auth, createTiffin);
router.put('/update/:tiffinId', auth, updateTiffin);
router.delete('/delete/:tiffinId', auth, deleteTiffin);
router.get('/city/:city', auth, getTiffinsByCity);
// router.post('/cart', auth, addToCart);

module.exports = router;

