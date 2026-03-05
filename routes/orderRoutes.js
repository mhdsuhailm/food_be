// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");

// router.post("/", async (req, res) => {
//   try {
//     const { customerName, phone, tableNumber, items } = req.body;

//     const totalAmount = items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     const formattedItems = items.map((item) => ({
//       itemId: item._id,
//       name: item.name,
//       price: item.price,
//       quantity: item.quantity,
//       subtotal: item.price * item.quantity
//     }));

//     const newOrder = new Order({
//       customerName,
//       phone,
//       tableNumber,
//       items: formattedItems,
//       totalAmount
//     });

//     await newOrder.save();

//     res.status(201).json({
//       message: "Order placed successfully",
//       order: newOrder
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware")

router.post("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const { items, tableNumber } = req.body

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    const newOrder = new Order({
      userId: user._id,
      customerName: user.name,
      phone: user.phone,
      tableNumber,
      items,
      totalAmount
    })

    await newOrder.save()

    res.status(201).json({ message: "Order placed", order: newOrder })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
// router.post("/", async (req, res) => {
//   try {
//     const { phone, tableNumber, items } = req.body;

//     // 🔹 Find user
//     const user = await User.findOne({ phone });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // 🔹 Calculate total
//     const totalAmount = items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     const formattedItems = items.map((item) => ({
//       itemId: item._id,
//       name: item.name,
//       price: item.price,
//       quantity: item.quantity,
//       subtotal: item.price * item.quantity
//     }));

//     const newOrder = new Order({
//       userId: user._id,
//       customerName: user.name,
//       phone: user.phone,
//       tableNumber,
//       items: formattedItems,
//       totalAmount
//     });

//     await newOrder.save();

//     res.status(201).json({
//       message: "Order placed successfully",
//       order: newOrder
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
router.get("/user/:phone", async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.params.phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = await Order.find({ userId: user._id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;