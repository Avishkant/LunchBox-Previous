const mongoose = require('mongoose'); 
const Tiffin = require('../models/Dabba');
const User = require('../models/dada');
// const Cart = require('../models/Cart');

exports.createTiffin = async (req, res) => {
    try {
        const { name, description, pricePerTiffin, pricePerMonth, image } = req.body;
        const providerId = req.user.id;

        const tiffin = new Tiffin({
            provider: providerId,
            name,
            description,
            pricePerTiffin,
            pricePerMonth,
            image
        });

        await tiffin.save();

        const provider = await User.findById(providerId);
        provider.tiffins.push(tiffin._id);
        await provider.save();

        res.status(201).json({ success: true, data: tiffin });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateTiffin = async (req, res) => {
    try {
        const { tiffinId } = req.params;
        const { name, description, pricePerTiffin, pricePerMonth, image, isAvailable } = req.body;

        // Ensure tiffinId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(tiffinId)) {
            return res.status(400).json({ success: false, message: 'Invalid tiffin ID' });
        }

        const tiffin = await Tiffin.findByIdAndUpdate(
            tiffinId,
            { name, description, pricePerTiffin, pricePerMonth, image, isAvailable },
            { new: true }
        );

        res.status(200).json({ success: true, data: tiffin });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteTiffin = async (req, res) => {
    try {
        const { tiffinId } = req.params;

        await Tiffin.findByIdAndDelete(tiffinId);

        const provider = await User.findById(req.user.id);
        provider.tiffins.pull(tiffinId);
        await provider.save();

        res.status(200).json({ success: true, message: 'Tiffin deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getTiffinsByCity = async (req, res) => {
    try {
        const { city } = req.params;

        const tiffins = await Tiffin.find({ isAvailable: true })
            .populate('provider', 'firstName lastName email contactNumber address city')
            .where('provider.city').equals(city);

        res.status(200).json({ success: true, data: tiffins });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// exports.addToCart = async (req, res) => {
//     try {
//         const customerId = req.user.id;
//         const { tiffinId, quantity } = req.body;

//         let cart = await Cart.findOne({ customer: customerId });
//         if (!cart) {
//             cart = new Cart({ customer: customerId, tiffins: [] });
//         }

//         const tiffin = await Tiffin.findById(tiffinId);
//         if (!tiffin) {
//             return res.status(404).json({ success: false, message: 'Tiffin not found' });
//         }

//         const existingItem = cart.tiffins.find(item => item.tiffin.toString() === tiffinId);
//         if (existingItem) {
//             existingItem.quantity += quantity;
//         } else {
//             cart.tiffins.push({ tiffin: tiffinId, quantity });
//         }

//         await cart.save();

//         res.status(200).json({ success: true, data: cart });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
