const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    contactNumber: {
        type: Number,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    accountType: {
        type: String,
        enum: ['Customer', 'TiffinProvider', 'Admin'],
        required: true
    },
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    pastOrders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    serviceName: {
        type: String,
        default: ""
    },
    tiffins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tiffin'
        }
    ],
    open: Boolean,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
