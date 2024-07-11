import React, { useState, useEffect } from "react";
import { getCategories, getExpenses, getIncomes } from "../api/apiEndpoint";

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
    const response = await getCategories();
    setCategories(response.categories);
  };

  const fetchExpenses = async () => {
    const response = await getExpenses();
    setExpenses(response.expenses);
  };

  const fetchIncomes = async () => {
    const response = await getIncomes();
    setIncomes(response.incomes);
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + parseFloat(item.amount), 0);
  };

  const totalExpenses = calculateTotal(expenses);
  const totalIncomes = calculateTotal(incomes);
  const balance = totalIncomes - totalExpenses;

  return (
    <div className="App">
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">Total Categories</h2>
            <p className="text-2xl">{categories.length}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">Total Incomes</h2>
            <p className="text-2xl">₹ {totalIncomes.toFixed(2)}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">Total Expenses</h2>
            <p className="text-2xl">₹ {totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow col-span-1 md:col-span-3">
            <h2 className="text-xl font-bold">Balance</h2>
            <p className="text-2xl">₹ {balance.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
          <ul>
            {expenses.slice(0, 5).map((expense) => (
              <li key={expense._id} className="border-b py-2">
                {expense.amount} - {expense.description} ({expense.date})
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Incomes</h2>
          <ul>
            {incomes.slice(0, 5).map((income) => (
              <li key={income._id} className="border-b py-2">
                {income.amount} - {income.description} ({income.date})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
