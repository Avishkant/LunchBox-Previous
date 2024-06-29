const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
        },
        total: Number,
    }
)