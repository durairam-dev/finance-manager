import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  getAllExpenses,
  getAllIncomes,
} from "../api/apiEndpoint";
import { formatDate } from "../utils/dateFormatUtils";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
    fetchIncomes();
  }, []);

  const fetchCategories = async () => {
    const response = await getAllCategories();
    setCategories(response);
  };

  const fetchExpenses = async () => {
    const response = await getAllExpenses();
    setExpenses(response);
  };

  const fetchIncomes = async () => {
    const response = await getAllIncomes();

    setIncomes(response);
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + parseFloat(item.amount), 0);
  };

  const totalExpenses = calculateTotal(expenses);
  const totalIncomes = calculateTotal(incomes);
  const balance = totalIncomes - totalExpenses;

  return (
    <div className="lg:p-4 p-2 bg-gray-200 dark:bg-gray-800">
      <h1 className="dark:text-white text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-400 dark:bg-slate-900 lg:p-4 p-2 rounded-lg shadow">
          <h2 className="dark:text-white text-xl font-bold">Balance</h2>
          <p className="dark:text-white text-2xl mt-2">
            ₹ {balance.toFixed(2)}
          </p>
        </div>
        <div className="bg-slate-400 dark:bg-slate-900 lg:p-4 p-2 rounded-lg shadow">
          <h2 className="dark:text-white text-xl font-bold">Total Incomes</h2>
          <p className="dark:text-white text-2xl mt-2">
            ₹ {totalIncomes.toFixed(2)}
          </p>
        </div>
        <div className="bg-slate-400 dark:bg-slate-900 lg:p-4 p-2 rounded-lg shadow">
          <h2 className="dark:text-white text-xl font-bold">Total Expenses</h2>
          <p className="dark:text-white text-2xl mt-2">
            ₹ {totalExpenses.toFixed(2)}
          </p>
        </div>
        {/* <div className="bg-slate-400 dark:bg-slate-900 lg:p-4 p-2 rounded-lg shadow">
          <h2 className="dark:text-white text-xl font-bold">
            Total Categories
          </h2>
          <p className="dark:text-white text-2xl mt-2">{categories.length}</p>
        </div> */}
      </div>
      <div className="mt-8">
        <h2 className="dark:text-white text-2xl font-bold mb-4">
          Recent Expenses
        </h2>
        <ul className="flex flex-col space-y-2 bg-slate-400 dark:bg-slate-900 lg:p-4 p-2 rounded-lg shadow">
          {expenses.slice(0, 5).map((expense) => (
            <li
              key={expense._id}
              className="dark:text-white bg-gray-200 dark:bg-gray-800 p-2 rounded-md shadow-sm"
            >
              <div className="flex justify-between">
                <p>
                  {expense.category_id.name} - ₹ {expense.amount}
                </p>
                <p>{formatDate(expense.date)}</p>
              </div>
              <p className="mt-1">{expense.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="dark:text-white text-2xl font-bold mb-4">
          Recent Incomes
        </h2>
        <ul className="flex flex-col space-y-2 bg-slate-400 dark:bg-slate-900 lg:p-4 p-2 rounded-lg shadow">
          {incomes.slice(0, 5).map((income) => (
            <li
              key={income._id}
              className="dark:text-white bg-gray-200 dark:bg-gray-800 p-2 rounded-md shadow-sm"
            >
              <div className="flex justify-between">
                <p>
                  {income.category_id.name} - ₹ {income.amount}
                </p>
                <p>{formatDate(income.date)}</p>
              </div>
              <p className="mt-1">{income.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
