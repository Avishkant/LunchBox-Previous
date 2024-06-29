const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName : {
            type: String,
            required : true,
            trim: true,
        },
        
        lastName : {
            type : String,
            required : true,
            trim : true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        // Define the role field with type String and enum values
        accountType: {
            type: String,
            enum: ["User", "Tiffine Provider"],
            required: true,
        },
    },
    // Add timestamps for when the document is created and last modified
    { timestamps: true }
)