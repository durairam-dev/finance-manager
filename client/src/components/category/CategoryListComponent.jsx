import React, { useState, useEffect } from "react";
import { getCategories, deleteCategory } from "../../api/apiEndpoint";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CategoryList = ({ setCategoryId, onOpen }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response);
  };

  const handleEditCategory = async (id) => {
    setCategoryId(id);
    onOpen();
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    fetchCategories();
  };

  return (
    <div className="lg:p-4 p-2">
      <ul className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
        {categories.map((category) => (
          <li
            key={category._id}
            className={`flex flex-col lg:space-y-4 space-y-2  rounded-md shadow-md lg:p-4 p-2
              ${category.type === "income" ? "bg-green-400" : "bg-red-400"}`}
          >
            <div className="w-full flex justify-between items-center">
              <span
                className={`block bg-white rounded-md shadow-md px-2 py-1 capitalize 
                  ${
                    category.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
              >
                {category.type}
              </span>
              <ul className="flex space-x-2">
                <li
                  onClick={() => handleEditCategory(category._id)}
                  className={`bg-white rounded-md shadow-md p-1 ${
                    category.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  <FaEdit />
                </li>
                <li
                  onClick={() => handleDeleteCategory(category._id)}
                  className={`bg-white rounded-md shadow-md text-green-400 p-1 ${
                    category.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  <MdDelete />
                </li>
              </ul>
            </div>
            <span className="block font-semibold text-white">
              {category.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
