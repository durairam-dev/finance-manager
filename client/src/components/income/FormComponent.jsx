import { useEffect, useState } from "react";
import {
  getIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
  getCategories,
} from "../../api/apiEndpoint";
import { IoClose } from "react-icons/io5";

const Form = ({ isOpen, onClose }) => {
  const [newIncome, setNewIncome] = useState({
    category_id: "",
    amount: "",
    description: "",
    income_date: "",
  });
  const [categories, setCategories] = useState([]); // State for categories

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
    setNewIncome({ ...newIncome, income_date: formattedDate });
    fetchCategories(); // Fetch categories on component mount
  }, []);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Incomes
          </h2>
          <button onClick={onClose} className="text-gray-200 hover:text-white">
            <IoClose className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleCreateIncome}>
          <div className="mb-4">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={newIncome.amount}
              onChange={(e) =>
                setNewIncome({ ...newIncome, amount: e.target.value })
              }
              placeholder="Amount"
            />
          </div>
          <div className="mb-4">
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={newIncome.description}
              onChange={(e) =>
                setNewIncome({ ...newIncome, description: e.target.value })
              }
              placeholder="Description"
            ></textarea>
          </div>
          <div className="mb-4">
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={newIncome.income_date}
              onChange={(e) =>
                setNewIncome({ ...newIncome, income_date: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <select
              value={newIncome.category_id}
              onChange={(e) =>
                setNewIncome({ ...newIncome, category_id: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option className="block w-full" value="">
                Select Category
              </option>
              {categories
                .filter((category) => category.type === "income") // Filter categories by type
                .map((category) => (
                  <option
                    className="block w-full"
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
