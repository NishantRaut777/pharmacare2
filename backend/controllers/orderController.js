const Order = require("../models/orders");
const Cart = require("../models/cart");
const User = require("../models/userModel");
const moment = require('moment-timezone');
// const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const getOrders = async(req, res) => {
    try {
        const userId = req.body.userid;
        const orders = await Order.find({ userId }).sort({ date: -1 });
        const finalOrders = orders.map((order) => {
            const formattedDate = order.date_added.toISOString().slice(0, 19).replace('T', ' ');
            
            // Update the order object with the formatted date
            const updatedOrder = {
                ...order.toObject(), // Convert Mongoose document to plain JavaScript object
                date_added: formattedDate
            };
            return updatedOrder;
        })
        res.status(200).send(finalOrders);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Get Orders Controller ERROR ${error}`,
            success: false
        })
    }
};

// this getorders gets orders accroding to order date
const getOrders2 = async(req, res) => {
    try {
        const userId = req.body.userid;
        const orders = await Order.find({ userId }).sort({ date: -1 });
        const newFinalOrders = {};
        const finalOrders = orders.map((order) => {
            // const formattedDate = order.date_added.toISOString().slice(0, 19).replace('T', ' ');
            // const formattedDate = moment(order.date_added).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
            const formattedDate = moment(order.date_added)
                .tz('Asia/Kolkata')
                .format('D-MMM-YYYY, h:mm A');

            // if(newFinalOrders.hasOwnProperty(formattedDate)){
            //     newFinalOrders[formattedDate] = [
            //         ...newFinalOrders[formattedDate],
            //         order.items
            //     ]
            // } else{
            //     newFinalOrders[formattedDate] = order.items;
            // }

            if(!newFinalOrders[formattedDate]){
                newFinalOrders[formattedDate] = []
            }

            newFinalOrders[formattedDate].push({
                ...order.toObject(),
                originalDate: order.date_added
            });
            
            // Update the order object with the formatted date
            // const updatedOrder = {
            //     ...order.toObject(), // Convert Mongoose document to plain JavaScript object
            //     date_added: formattedDate
            // };
            // return updatedOrder;
        })
        res.status(200).send(newFinalOrders);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Get Orders Controller ERROR ${error}`,
            success: false
        })
    }
};

const checkoutOrder = async(req,res) => {
    try {
        // const userId = req.params.id;
        const { userId, fullName, emailAddress, phoneNumber, shippingAddress, city, state, zipCode, CardNumber } = req.body;
        // console.log(userId);
        const cartData = await Cart.findOne({ userId });
        // console.log(cartData);

        // proceed only if there is cart available for current user.
        if(!cartData){
            res.status(404).send("There is no cart for current user");
        }
        const cartItems = cartData.items;
        const cartBill = cartData.bill;
        const orderData = {
            userId: userId,
            fullName: fullName,
            emailAddress: emailAddress,
            items: cartItems,
            bill: cartBill,
            shippingAddress: shippingAddress,
            city: city,
            state: state,
            zipCode: zipCode,
            phoneNumber: phoneNumber,
            CardNumber: CardNumber
        };

        const resInsert = await Order.create(orderData);
        if(resInsert){
            const result = await Cart.deleteOne({ userId });
            const finalData = { success: true, ...result }
            res.status(200).send(finalData);
        } else{
            res.status(404).send("Something went wrong during checkout");
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Checkout Order Controller ERROR ${error}`,
            success: false
        })
    };
};

// deletes order by taking date
const deleteOrder = async(req, res) => {
    try {
        const { mydate } = req.body;
        const targetDate = new Date(mydate);

        await Order.deleteMany({ date_added: targetDate });

        res.status(200).send({
            message: "Orders deleted successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Delete Order Controller ERROR ${error}`,
            success: false
        })
    }
}

module.exports = { getOrders, checkoutOrder, getOrders2, deleteOrder };