const mongoose = require('mongoose');

const tiffinSchema = new mongoose.Schema(
    {
        provider: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
        },
        name: {
            type: String, required: true
        },
        description: {
            type: String
        },
        pricePerTiffin: {
            type: Number, required: true
        },
        pricePerMonth: {
            type: Number, required: true
        },
        image: {
            type: String
        },
        isAvalable: {
            type: Boolean,
            default: true
        }
        // dishes: [{ name: { type: String }, description: { type: String }, price: { type: Number } }]
    }, { timestamps: true });

// Use mongoose.model() with the check to avoid overwriting the model
const Tiffin = mongoose.models.Tiffin || mongoose.model('Tiffin', tiffinSchema);

module.exports = Tiffin;
