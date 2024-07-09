import React, { useState, useEffect } from "react";
import { getExpenses, deleteExpense } from "../../api/apiEndpoint";

const ExpenseList = ({ setExpenseId, onOpen }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const response = await getExpenses();
    setExpenses(response);
  };

  const handleEditExpense = async (id) => {
    setExpenseId(id);
    onOpen();
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  return (
    <div className="p-4">
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
                onClick={() => handleEditExpense(expense._id)}
                className="bg-yellow-400 p-2 mr-2"
              >
                Edit
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
