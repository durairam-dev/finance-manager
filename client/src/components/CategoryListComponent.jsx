import React, { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/apiEndpoint";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", type: "expense" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response.data);
  };

  const handleCreateCategory = async () => {
    await createCategory(newCategory);
    fetchCategories();
  };

  const handleUpdateCategory = async (id) => {
    await updateCategory(id, newCategory);
    fetchCategories();
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    fetchCategories();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          placeholder="Category Name"
          className="border p-2"
        />
        <select
          value={newCategory.type}
          onChange={(e) =>
            setNewCategory({ ...newCategory, type: e.target.value })
          }
          className="border p-2"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button
          onClick={handleCreateCategory}
          className="bg-blue-600 text-white p-2"
        >
          Add Category
        </button>
      </div>
      <ul>
        {categories.map((category) => (
          <li
            key={category._id}
            className="flex justify-between items-center mb-2"
          >
            <span>
              {category.name} ({category.type})
            </span>
            <div>
              <button
                onClick={() => handleUpdateCategory(category._id)}
                className="bg-yellow-400 p-2 mr-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteCategory(category._id)}
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

export default CategoryList;
