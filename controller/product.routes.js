import express from "express";
import Product from "../model/product.model.js";
const router = express.Router();
import { auth } from "../middleware/auth.middleware.js";

//add a product
router.post("/add", auth, async function (req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json(err);
  }
});

//search for all products
router.get("/", async function (req, res) {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//search for a product by name
router.get("/search", async function (req, res) {
  try {
    const product = await Product.find({ name: req.body.name });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a product
router.put("/update", auth, async function (req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//search for a product by category
router.get("/category", async function (req, res) {
  try {
    const product = await Product.find({ category: req.body.category });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//search for a product by seller
router.get("/seller", async function (req, res) {
  try {
    const product = await Product.find({ seller: req.body.seller });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a product
router.get("/delete", auth, async function (req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.body.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//add a review to a product
router.put("/review", auth, async function (req, res) {
  try {
    const product = await Product.findByIdAndUpdate(
      req.body.id,
      { $push: { reviews: req.body.reviews } },
      { new: true }
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a review from a product

router.put("/review/delete", auth, async function (req, res) {
  try {
    const product = await Product.findByIdAndUpdate(
      req.body.id,
      { $pull: { reviews: req.body.reviews } },
      { new: true }
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
