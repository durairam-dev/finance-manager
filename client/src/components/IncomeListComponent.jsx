import React, { useState, useEffect } from "react";
import {
  getIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
  getCategories,
} from "../api/apiEndpoint";

const IncomeList = () => {
  const [incomes, setIncomes] = useState([]);
  const [newIncome, setNewIncome] = useState({
    category_id: "",
    amount: "",
    description: "",
    income_date: "",
  });
  const [categories, setCategories] = useState([]); // State for categories

  useEffect(() => {
    fetchIncomes();
    fetchCategories(); // Fetch categories on component mount
  }, []);

  const fetchIncomes = async () => {
    const response = await getIncomes();
    setIncomes(response.data);
  };

  const fetchCategories = async () => {
    const response = await getCategories(); // Fetch categories from API
    setCategories(response.data);
  };

  const handleCreateIncome = async () => {
    await createIncome(newIncome);
    fetchIncomes();
  };

  const handleUpdateIncome = async (id) => {
    await updateIncome(id, newIncome);
    fetchIncomes();
  };

  const handleDeleteIncome = async (id) => {
    await deleteIncome(id);
    fetchIncomes();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Incomes</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newIncome.amount}
          onChange={(e) =>
            setNewIncome({ ...newIncome, amount: e.target.value })
          }
          placeholder="Amount"
          className="border p-2"
        />
        <input
          type="text"
          value={newIncome.description}
          onChange={(e) =>
            setNewIncome({ ...newIncome, description: e.target.value })
          }
          placeholder="Description"
          className="border p-2"
        />
        <input
          type="date"
          value={newIncome.income_date}
          onChange={(e) =>
            setNewIncome({ ...newIncome, income_date: e.target.value })
          }
          className="border p-2"
        />
        <select
          value={newIncome.category_id}
          onChange={(e) =>
            setNewIncome({ ...newIncome, category_id: e.target.value })
          }
          className="border p-2"
        >
          <option value="">Select Category</option>
          {categories
            .filter((category) => category.type === "income") // Filter categories by type
            .map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button
          onClick={handleCreateIncome}
          className="bg-blue-600 text-white p-2"
        >
          Add Income
        </button>
      </div>
      <ul>
        {incomes.map((income) => (
          <li
            key={income._id}
            className="flex justify-between items-center mb-2"
          >
            <span>
              {income.amount} - {income.description} ({income.income_date})
            </span>
            <div>
              <button
                onClick={() => handleUpdateIncome(income._id)}
                className="bg-yellow-400 p-2 mr-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteIncome(income._id)}
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

export default IncomeList;
