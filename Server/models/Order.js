const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
        },
        tiffinProvider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TiffinProvider',
            required: true
        },
        menuItems: [
            {
                dishName: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
            }
        ],
        totalPrice: {
            type: Number,
            required: true
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ['COD', 'Online']
        },
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Accepted', 'Rejected', 'Delivered'],
            default: 'Pending'
        },
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);