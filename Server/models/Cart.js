const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tiffins: [
        {
            tiffin: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tiffin',
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ]
}, { timestamps: true });

cartSchema.index({ customer: 1, 'tiffins.tiffin': 1 }, { unique: true });

// Use mongoose.model() with the check to avoid overwriting the model
const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
module.exports = Cart;

// module.exports = mongoose.model('Cart', cartSchema);
