import React, { useState, useEffect } from "react";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getCategories,
} from "../api/apiEndpoint";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    category_id: "",
    amount: "",
    description: "",
    expense_date: "",
  });
  const [categories, setCategories] = useState([]); // State for categories

  useEffect(() => {
    fetchExpenses();
    fetchCategories(); // Fetch categories on component mount
  }, []);

  const fetchExpenses = async () => {
    const response = await getExpenses();
    setExpenses(response.data);
  };

  const fetchCategories = async () => {
    const response = await getCategories(); // Fetch categories from API
    setCategories(response.data);
  };

  const handleCreateExpense = async () => {
    await createExpense(newExpense);
    fetchExpenses();
  };

  const handleUpdateExpense = async (id) => {
    await updateExpense(id, newExpense);
    fetchExpenses();
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Expenses</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({ ...newExpense, amount: e.target.value })
          }
          placeholder="Amount"
          className="border p-2"
        />
        <input
          type="text"
          value={newExpense.description}
          onChange={(e) =>
            setNewExpense({ ...newExpense, description: e.target.value })
          }
          placeholder="Description"
          className="border p-2"
        />
        <input
          type="date"
          value={newExpense.expense_date}
          onChange={(e) =>
            setNewExpense({ ...newExpense, expense_date: e.target.value })
          }
          className="border p-2"
        />
        <select
          value={newExpense.category_id}
          onChange={(e) =>
            setNewExpense({ ...newExpense, category_id: e.target.value })
          }
          className="border p-2"
        >
          <option value="">Select Category</option>
          {categories
            .filter((category) => category.type === "expense") // Filter categories by type
            .map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button
          onClick={handleCreateExpense}
          className="bg-blue-600 text-white p-2"
        >
          Add Expense
        </button>
      </div>
      <ul>
        {expenses.map((expense) => (
          <li
            key={expense._id}
            className="flex justify-between items-center mb-2"
          >
            <span>
              {expense.amount} - {expense.description} ({expense.expense_date})
            </span>
            <div>
              <button
                onClick={() => handleUpdateExpense(expense._id)}
                className="bg-yellow-400 p-2 mr-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteExpense(expense._id)}
                className="bg-red-600 text-white p-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
