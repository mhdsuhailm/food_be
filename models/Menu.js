const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,

    category: { type: String, required: true },   // "Signature Biryani Collection"
availableIn: [
  {
    type: String,
    enum: ["breakfast", "lunch", "dinner"]
  }
],
    chefnote: String,
    ingredients: [String],

    preferredTime: String,
    bestseller: { type: Boolean, default: false },
    type: { type: String }, // veg | non-veg | dessert
    rating: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);