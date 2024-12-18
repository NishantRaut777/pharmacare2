const express = require("express");
const { checkoutOrder, getOrders, getOrders2, deleteOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/getOrders", getOrders);
router.post("/getOrders2", getOrders2);
router.post("/checkoutOrder", checkoutOrder);
router.post("/deleteOrder", deleteOrder)

module.exports = router;