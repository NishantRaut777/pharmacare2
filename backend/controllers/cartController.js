const Cart = require("../models/cart");
const Product = require("../models/productModel");

const getCartItems = async(req, res) => {
    const userId = req.params.id;
    try {
        let cart = await Cart.findOne({userId});
        if(cart && cart.items.length > 0){
            res.send(cart);
        } else {
            res.send(null);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Get Cart Item Controller ERROR ${error}`,
            success: false
        })
    }
};


const addCartItem = async(req, res) => {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({userId});
        let item = await Product.findOne({_id: productId});

        if(!item){
            res.status(404).send("Item not found");
        }

        const price = item.price;
        const name = item.name;
        const imagesrc = item.imagesrc;

        if(cart){
            // check if product already exist in the cart 
            let itemIndex = cart.items.findIndex(p => p.productId === productId);

            if(itemIndex > -1){
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            } else {
                cart.items.push({  productId, name, imagesrc, quantity, price });
            }

            cart.bill += quantity * price;
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            // if no cart exists for given user create new one
            const newCart = await Cart.create({
                userId,
                items: [{ productId, name, imagesrc, quantity, price }],
                bill: quantity * price
            });
            return res.status(201).send(newCart);

        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Add Cart Item Controller ERROR ${error}`,
            success: false
        })
    }
};

// increments, decrements products quantity  by 1 and updates price
const addCartItemINCRDECR = async(req, res) => {
    const userId = req.params.id;
    const { productId, type } = req.body;

    try {
        let cart = await Cart.findOne({userId});
        let item = await Product.findOne({_id: productId});

        if(!item){
            res.status(404).send("Item not found");
        }

        const price = item.price;
        const name = item.name;
        const imagesrc = item.imagesrc;

        if(cart){
            // check if product already exist in the cart 
            let itemIndex = cart.items.findIndex(p => p.productId === productId);
            let quantity

            if(itemIndex > -1){
                let productItem = cart.items[itemIndex];
                if (type == "INCR"){
                    // Incrementing quantity by 1
                    productItem.quantity += 1;
                    quantity = productItem.quantity
                    cart.bill += price;
                } else if (type == "DECR"){
                    if (productItem.quantity > 1){
                        // Decrementing quantity by 1
                        productItem.quantity -= 1;
                        quantity = productItem.quantity
                        cart.bill -= price;
                    } 
                }
               
                cart.items[itemIndex] = productItem;
            } else {
                quantity = 1;
                cart.items.push({  productId, name, imagesrc, quantity, price });
            }

            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            // if no cart exists for given user create new one
            let quantity = 1;
            const newCart = await Cart.create({
                userId,
                items: [{ productId, name, imagesrc, quantity, price }],
                bill: quantity * price
            });
            return res.status(201).send(newCart);

        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Add Cart Item Controller ERROR ${error}`,
            success: false
        })
    }
};


const deleteCartItem = async(req, res) => {
    const userId = req.params.userId;
    const productId = req.params.itemId;

    try {
        let cart = await Cart.findOne({userId});
        let itemIndex = cart.items.findIndex(p => p.productId === productId);

        if(itemIndex > -1){
            let productItem = cart.items[itemIndex];
            // delete the product and decrease the bill
            cart.bill -= productItem.quantity * productItem.price;
            cart.items.splice(itemIndex, 1);
        }

        cart = await cart.save();
        return res.status(201).send(cart);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Delete Cart Item Controller ERROR ${error}`,
            success: false
        })
    }
};

module.exports = { getCartItems, addCartItem, deleteCartItem, addCartItemINCRDECR };