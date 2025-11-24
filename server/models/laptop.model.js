const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true,
            trim: true,
        },
        model: {
            type: String,
            required: true,
            trim: true,
        },
        processor: {
            type: String,
            required: true,
            trim: true,
        },
        ram: {
            type: String, // e.g., "16GB"
            required: true,
        },
        storage: {
            type: String, // e.g., "512GB SSD"
            required: true,
        },
        graphics: {
            type: String, // e.g., "NVIDIA RTX 3060"
            default: "Integrated",
        },
        display: {
            type: String, // e.g., "15.6-inch FHD"
        },
        os: {
            type: String, // e.g., "Windows 11", "macOS", "Linux"
            default: "Windows 11",
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        stock: {
            type: Number,
            default: 0,
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
        description: {
            type: String,
            trim: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Laptop = mongoose.model("Laptop", laptopSchema);

module.exports = Laptop;