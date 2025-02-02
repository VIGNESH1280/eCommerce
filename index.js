import express from "express";
import dotenv from "dotenv";
import userRoutes from "./controller/user.routes.js";
import mongoose from "mongoose";
dotenv.config();
const app = express();



app.use(express.json())
app.use("/users", userRoutes);
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
