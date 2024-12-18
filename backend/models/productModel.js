const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    imagesrc: {
        type: String,
        required: [true, "Image is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    category: {
        type: Array,
        required: [true, "Category is required"]
    },
    features: {
        type: Array,
        required: [true, "Features are required"]
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"]
    },
    brand: {
        type: String,
        required: [true, "Brand Name is required"]
    }
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;                         