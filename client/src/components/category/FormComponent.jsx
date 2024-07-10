import { useEffect, useState } from "react";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../../api/apiEndpoint";
import { IoClose } from "react-icons/io5";

const Modal = ({ onClose, categoryId }) => {
  const [category, setCategory] = useState({ name: "", type: "expense" });

  useEffect(() => {
    categoryId && handleGetCategory(categoryId);
  }, []);

  const handleGetCategory = async (id) => {
    const editCategory = await getCategory(id);
    setCategory({ name: editCategory.name, type: editCategory.type });
  };

  const handleSaveCategory = async () => {
    categoryId
      ? handleUpdateCategory(categoryId, category)
      : handleCreateCategory(category);
  };

  const handleCreateCategory = async () => {
    await createCategory(category);
    fetchCategories();
  };

  const handleUpdateCategory = async (id, category) => {
    await updateCategory(id, category);
    fetchCategories();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Category
          </h2>
          <button onClick={onClose} className="text-gray-200 hover:text-white">
            <IoClose className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSaveCategory}>
          <div className="mb-4">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="name"
              value={category.name}
              placeholder="Name"
              autoComplete="true"
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <select
              name="type"
              value={category.type}
              onChange={(e) =>
                setCategory({ ...category, type: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option className="block w-full" value="expense">
                Expense
              </option>
              <option className="block w-full" value="income">
                Income
              </option>
            </select>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              {categoryId ? "Update" : "Add"} Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
