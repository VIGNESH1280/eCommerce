import express from "express";
import Product from "../controller/product.routes.js";
import Order from "../model/order.model.js";
const router = express.Router();

//Cart Routes

//Place Order
router.post("/place", async function (req, res) {
  try {
    const { user, orderItems, shippingAddress, paymentMethod } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    //Fetch product details and calculate total price
    const populatedOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product not forund ${item.product}`);
        }
        return {
          product: product._id,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );
    const totalPrice = populatedOrderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const order = await Order.create({
        user:user,
        orderItems:populatedOrderItems,
        shippingAddress:shippingAddress,
        paymentMethod:paymentMethod,
        totalPrice:totalPrice,
        paid:Date.now(),
        trackingNumber:generateTrackingNumber(),
    })
    res.status(201).json(order);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error placing order", error: err.message });
  }
});


//get order by ID
router.get("/:id", async function(req, res){
    try{
        const order = Order.findById(req.params.id);
        res.status(209).json(err)
    }catch(err){
        res.status(500).json(err)
    }
})