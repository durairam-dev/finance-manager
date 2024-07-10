import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  createIncome,
  getAllCategories,
  getIncome,
  updateIncome,
} from "../../api/apiEndpoint";

const Form = ({ onClose, incomeId }) => {
  const [income, setIncome] = useState({
    category_id: "",
    amount: "",
    description: "",
    date: "",
  });
  const [categories, setCategories] = useState([]); // State for categories

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
    incomeId
      ? handleGetIncome(incomeId)
      : setIncome({ ...income, date: formattedDate });
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await getAllCategories(); // Fetch categories from API
    setCategories(response);
  };

  const handleGetIncome = async (id) => {
    const editIncome = await getIncome(id);
    setIncome({
      category_id: editIncome.category_id._id,
      amount: editIncome.amount,
      description: editIncome.description,
      date: editIncome.date.split("T")[0],
    });
  };

  const handleSaveIncome = async () => {
    incomeId
      ? handleUpdateIncome(incomeId, income)
      : handleCreateIncome(income);
  };

  const handleCreateIncome = async () => {
    await createIncome(income);
    fetchIncomes();
  };

  const handleUpdateIncome = async (id) => {
    await updateIncome(id, income);
    fetchIncomes();
  };

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
        <form onSubmit={handleSaveIncome}>
          <div className="mb-4">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={income.amount}
              onChange={(e) => setIncome({ ...income, amount: e.target.value })}
              placeholder="Amount"
            />
          </div>
          <div className="mb-4">
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={income.description}
              onChange={(e) =>
                setIncome({ ...income, description: e.target.value })
              }
              placeholder="Description"
            ></textarea>
          </div>
          <div className="mb-4">
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={income.date}
              onChange={(e) => setIncome({ ...income, date: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <select
              value={income.category_id}
              onChange={(e) =>
                setIncome({ ...income, category_id: e.target.value })
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
              {incomeId ? "Update" : "Add"} Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
