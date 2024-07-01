const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
        },
        contactNumber: {
            type: Number,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        profilePicture: {
            type: String
        },

        // Define the role field with type String and enum values
        accountType: {
            type: String,
            enum: ["Customer", "TiffinProvider", "Admin"],
            required: true,
        },

        address: {
            type: String
        },
        city: {
            type: String,
            // required: true
        },

        // pastOrders: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Order'
        //     }
        // ],

        //Additional Details for the tiffine provider
        serviceName: {
            type: String
        }, // Specific to TiffinProvider

        menu: [
            {
                dishName: { type: String },
                pricePerTiffin: { type: Number },
                pricePerMonth: { type: Number },
                images: [String],
            }
        ],

        open: Boolean,

        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order'
            }
        ],

        // Cart Reference
        cart: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Cart'
        },
    },



    // Add timestamps for when the document is created and last modified
    { timestamps: true }
);
module.exports = mongoose.model('User', userSchema);