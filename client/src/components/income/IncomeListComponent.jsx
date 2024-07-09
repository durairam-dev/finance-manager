import React, { useState, useEffect } from "react";
import {
  getIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
  getCategories,
} from "../../api/apiEndpoint";

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
