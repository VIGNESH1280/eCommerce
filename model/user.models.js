import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    min: [3, "Name must be 3 characters long"],
    max: [20, "Name must atmost 20 characters long"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "super"],
    default: "user",
  },
  cart: {
    type: Array,
    default: [],
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  reviews: {
    type: Array,
    default: [],
  },
});

userSchema.pre("save", async function (next){
  try {
    const user = this;

    if (!this.isModified("password")){
      return next();
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPass = await bcrypt.hash(user.password, salt);
    user.password = hashedPass;
    next();
  } catch (err) {
    res.status(500).json(err);
  }
});

userSchema.methods.comparePassword=async function(password){
  try{
    return await bcrypt.compare(password, this.password)
  }catch(err){
    throw new Error("Error comparing password");
  }
}








const User = mongoose.model("User", userSchema);
export default User;
