const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    tiffin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tiffin',
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected', 'Delivered'],
        default: 'Pending'
    },
    // deliveryDate: {
    //     type: Date
    // },
    orderType: {
        type: String,
        enum: ['Single', 'Monthly'],
        required: true
    },
    daysCompleted: {
        type: Number,
        default: 0
    },
    orderAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
