const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    customerName: String,
    phone: String,
    tableNumber: String,

    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
        name: String,
        price: Number,
        quantity: Number,
        subtotal: Number
      }
    ],

    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "preparing", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);