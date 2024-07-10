const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
