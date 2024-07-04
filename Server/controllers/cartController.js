const mongoose = require('mongoose');
const Cart = require('../models/cart');
const Tiffin = require('../models/tiffin');

// Add a tiffin to the cart
exports.addTiffinToCart = async (req, res) => {
    try {
        const { tiffinId, quantity } = req.body;
        const customerId = req.user.id;

        const tiffin = await Tiffin.findById(tiffinId);
        if (!tiffin) {
            return res.status(404).json({ success: false, message: 'Tiffin not found' });
        }

        // Find the cart and update the quantity if the tiffin already exists
        const cart = await Cart.findOneAndUpdate(
            { customer: customerId, 'tiffins.tiffin': tiffinId },
            { $inc: { 'tiffins.$.quantity': quantity } },
            { new: true }
        );

        if (cart && cart.tiffins.some(item => item.tiffin.equals(tiffinId))) {
            return res.status(200).json({ success: true, data: cart });
        }

        // If the tiffin is not found in the cart, add it to the cart
        const updatedCart = await Cart.findOneAndUpdate(
            { customer: customerId },
            { $push: { tiffins: { tiffin: tiffinId, quantity } } },
            { new: true, upsert: true }
        );

        res.status(200).json({ success: true, data: updatedCart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Increment the quantity of a tiffin in the cart
exports.incrementTiffinQuantity = async (req, res) => {
    try {
        const { tiffinId } = req.body;
        const customerId = req.user.id;

        const cart = await Cart.findOneAndUpdate(
            { customer: customerId, 'tiffins.tiffin': tiffinId },
            { $inc: { 'tiffins.$.quantity': 1 } },
            { new: true }
        );

        if (!cart || !cart.tiffins.find(item => item.tiffin.equals(tiffinId))) {
            return res.status(404).json({ success: false, message: 'Tiffin not found in cart' });
        }

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Decrement the quantity of a tiffin in the cart
exports.decrementTiffinQuantity = async (req, res) => {
    try {
        const { tiffinId } = req.body;
        const customerId = req.user.id;

        const cart = await Cart.findOneAndUpdate(
            { customer: customerId, 'tiffins.tiffin': tiffinId },
            { $inc: { 'tiffins.$.quantity': -1 } },
            { new: true }
        );

        if (!cart || !cart.tiffins.find(item => item.tiffin.equals(tiffinId))) {
            return res.status(404).json({ success: false, message: 'Tiffin not found in cart' });
        }

        if (cart.tiffins.find(item => item.tiffin.equals(tiffinId)).quantity <= 0) {
            await Cart.findOneAndUpdate(
                { customer: customerId },
                { $pull: { tiffins: { tiffin: tiffinId } } },
                { new: true }
            );
        }

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
 

// Remove a tiffin from the cart
exports.removeTiffinFromCart = async (req, res) => {
    try {
        const { tiffinId } = req.body;
        const customerId = req.user.id;

        // Convert tiffinId to ObjectId
        const tiffinObjectId = new mongoose.Types.ObjectId(tiffinId);

        console.log('Removing tiffin with ID:', tiffinObjectId); // Debugging log

        // Find the cart and pull the tiffin from the array
        const cart = await Cart.findOneAndUpdate(
            { customer: customerId, 'tiffins.tiffin': tiffinObjectId },
            { $pull: { tiffins: { tiffin: tiffinObjectId } } },
            { new: true }
        );

        console.log('Updated cart:', cart); // Debugging log

        // Check if the cart exists and if the tiffin was removed
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        // If there are no tiffins left, delete the cart
        if (cart.tiffins.length === 0) {
            await Cart.findByIdAndDelete(cart._id);
            return res.status(200).json({ success: true, message: 'Cart was empty and has been deleted' });
        }

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
