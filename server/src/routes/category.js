const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Create a new category
router.post("/", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all categories
router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find().sort({ created_at: "desc" });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get categories with pagination
router.get("/", async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortField = "created_at",
    sortOrder = "asc",
  } = req.query;

  try {
    const categories = await Category.find()
      .sort({ [sortField]: sortOrder === "asc" ? 1 : -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Category.countDocuments();

    res.json({
      categories,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single category by ID
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a category
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
