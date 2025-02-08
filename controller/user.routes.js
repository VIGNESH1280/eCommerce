import express from "express";
const router = express.Router(); //***IMPORTANT
import User from "../model/user.models.js";
import Product from "../model/product.model.js";
import generateToken from "../middleware/auth.middleware.js";
import { compare } from "bcrypt";
router.get("/", async (req, res) => {
  try {
    const user = User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (!user) {
      res.status(400).json({ message: "User Registeration failed" });
    }
    const payload = {
      email: user.email,
    };
    const token = await generateToken(payload);
    if (!token) {
      res.status(201).json({ message: "Token Generation Failed" });
    }
    res
      .status(201)
      .send({ message: "User Registeration Sucess", token: token });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "User doesn't exist" });
    }
    const isCorrect = user.comparePassword(password);
    if (!isCorrect) {
      res.status(400).json({ message: "Incorrect Password" });
    }
    res.status(200).json({ message: "Login Sucess" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.status(200).json({ message: "Logout Success" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ name: username });
    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    }
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/update", (req, res) => {
  res.status(200).send("Update route");
});

router.delete("/delete", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findByIdAndDelete({ email: email });
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ message: "User deleted sucessfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Add to Cart
router.post("/add/cart", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    let cart = req.session.cart ? req.session.cart : {};
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        cartItems: [],
      });
      let item = cart.items.find((i) => i.product.toString() === productId);
      if (item > -1) {
        cart.items[item].quantity += quantity;
      } else {
        cart.items.push({
          product: productId,
          quantity: quantity,
          price: product.price,
        });
      }
      await Cart.save();
      res.status(201).json(cart);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
