// models/User.js
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: String,  currentStep: {
    type: String,
    default: "START"
  }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)