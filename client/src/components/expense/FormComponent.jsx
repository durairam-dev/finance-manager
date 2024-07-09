import { useEffect, useState } from "react";
import {
  createExpense,
  updateExpense,
  getCategories,
  getExpense,
} from "../../api/apiEndpoint";
import { IoClose } from "react-icons/io5";

const Form = ({ onClose, expenseId }) => {
  const [expense, setExpense] = useState({
    category_id: "",
    amount: "",
    description: "",
    expense_date: "",
  });
  const [categories, setCategories] = useState([]); // State for categories

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
    expenseId
      ? handleGetExpense(expenseId)
      : setExpense({ ...expense, expense_date: formattedDate });
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await getCategories(); // Fetch categories from API
    setCategories(response);
  };

  const handleGetExpense = async (id) => {
    const editExpense = await getExpense(id);
    console.log(editExpense);
    setExpense({
      category_id: editExpense.category_id._id,
      amount: editExpense.amount,
      description: editExpense.description,
      expense_date: editExpense.expense_date.split("T")[0],
    });
    console.log(expense);
  };

  const handleSaveExpense = async () => {
    expenseId
      ? handleUpdateExpense(expenseId, expense)
      : handleCreateExpense(expense);
  };

  const handleCreateExpense = async () => {
    await createExpense(expense);
    fetchExpenses();
  };

  const handleUpdateExpense = async (id) => {
    await updateExpense(id, expense);
    fetchExpenses();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Expenses
          </h2>
          <button onClick={onClose} className="text-gray-200 hover:text-white">
            <IoClose className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSaveExpense}>
          <div className="mb-4">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={expense.amount}
              onChange={(e) =>
                setExpense({ ...expense, amount: e.target.value })
              }
              placeholder="Amount"
            />
          </div>
          <div className="mb-4">
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={expense.description}
              onChange={(e) =>
                setExpense({ ...expense, description: e.target.value })
              }
              placeholder="Description"
            ></textarea>
          </div>
          <div className="mb-4">
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={expense.expense_date}
              onChange={(e) =>
                setExpense({ ...expense, expense_date: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <select
              value={expense.category_id}
              onChange={(e) =>
                setExpense({ ...expense, category_id: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option className="block w-full" value="">
                Select Category
              </option>
              {categories
                .filter((category) => category.type === "expense") // Filter categories by type
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
              {expenseId ? "Update" : "Add"} Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
