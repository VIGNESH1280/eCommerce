import express from "express";
const router = express.Router(); //***IMPORTANT
import User from "../model/user.models.js";

router.get("/", (req, res) => {
  res.status(200).send("User management of ecommerce API");
});



router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post("/login", (req, res) => {
  res.status(200).send("Login route");
});
router.get("/logout", (req, res) => {
  res.status(200).send("Logout route");
});
router.get("/profile", (req, res) => {
  res.status(200).send("Profile route");
});
router.put("/update", (req, res) => {
  res.status(200).send("Update route");
});
router.delete("/delete", (req, res) => {
  res.status(200).send("Delete route");
});
export default router;
