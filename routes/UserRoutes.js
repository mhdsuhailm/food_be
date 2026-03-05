const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 🔹 Create user
router.post("/", async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const existing = await User.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      phone,
      email
    });

    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Get all users (for testing)
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;