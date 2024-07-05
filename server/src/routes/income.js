const express = require("express");
const router = express.Router();
const Income = require("../models/Income");

// Create a new income
router.post("/", async (req, res) => {
  try {
    const income = new Income(req.body);
    await income.save();
    res.status(201).json(income);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all incomes
router.get("/", async (req, res) => {
  try {
    const incomes = await Income.find().populate("category_id");
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single income by ID
router.get("/:id", async (req, res) => {
  try {
    const income = await Income.findById(req.params.id).populate("category_id");
    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an income
router.put("/:id", async (req, res) => {
  try {
    const income = await Income.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }
    res.status(200).json(income);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an income
router.delete("/:id", async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }
    res.status(200).json({ message: "Income deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
