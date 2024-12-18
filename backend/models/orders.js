const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    fullName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    items: [{
        productId: {
            type: String
        },
        name: String,
        imagesrc: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.']
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipCode: {
        type: Number,
        required: true
    },
    CardNumber: {
        type: Number,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    }
},  {timestamps: true});

const orderModel = mongoose.model("order", ordersSchema);

module.exports = orderModel;