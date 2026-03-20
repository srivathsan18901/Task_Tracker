// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  empCode: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee"
  },

  designation: String,
  department: String,
  location: String

}, { timestamps: true });

export default mongoose.model("User", userSchema);