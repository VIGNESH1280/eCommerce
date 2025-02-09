import express from "express";
import dotenv from "dotenv";
import userRoutes from "./controller/user.routes.js";
import productRoutes from "./controller/product.routes.js";
import orderRoutes from "./controller/order.routes.js"
import mongoose from "mongoose";
dotenv.config();
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("OM SRI SAI RAM");
});

app.listen(process.env.PORT, () => {
  console.log(`Server connected to the port:${process.env.PORT} sucessfully`);
});
