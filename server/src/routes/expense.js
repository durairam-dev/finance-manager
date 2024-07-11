const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Create a new expense
router.post("/", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all expenses
router.get("/all", async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate("category_id", "name")
      .sort({ date: "desc" });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get expenses with pagination
router.get("/", async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortField = "date",
    sortOrder = "desc",
  } = req.query;

  try {
    const expenses = await Expense.find()
      .populate("category_id", "name")
      .sort({ [sortField]: sortOrder === "asc" ? 1 : -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Expense.countDocuments();

    res.json({
      expenses,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single expense by ID
router.get("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).populate(
      "category_id"
    );
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an expense
router.put("/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an expense
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
