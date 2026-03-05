const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");

// 🔹 Get menu (filter by mealType)
router.get("/", async (req, res) => {
  try {
    const { type } = req.query;

    const filter = { available: true };

    if (type) {
      filter.availableIn = type;
    }

    const items = await Menu.find(filter);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Create new menu item
router.post("/", async (req, res) => {
  try {
    const item = new Menu(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔹 Update menu item
router.put("/:id", async (req, res) => {
  try {
    const updated = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔹 Soft delete (disable item)
router.put("/disable/:id", async (req, res) => {
  try {
    const updated = await Menu.findByIdAndUpdate(
      req.params.id,
      { available: false },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.post("/bulk", async (req, res) => {
  try {
    const items = await Menu.insertMany(req.body);
    res.status(201).json(items);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;