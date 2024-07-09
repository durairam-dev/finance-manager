import { useState } from "react";
import CategoryForm from "../components/category/FormComponent";
import CategoryList from "../components/category/CategoryListComponent";

const Categories = () => {
  const [isCategoryFormOpen, setCategoryFormOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const openCategoryForm = () => setCategoryFormOpen(true);
  const closeCategoryForm = () => {
    setCategoryFormOpen(false);
    setCategoryId("");
  };

  return (
    <div className="lg:p-4 p-2">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold">Categories</h1>
        <button
          onClick={openCategoryForm}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          New Category
        </button>
      </div>
      <CategoryList setCategoryId={setCategoryId} onOpen={openCategoryForm} />
      {isCategoryFormOpen && (
        <CategoryForm onClose={closeCategoryForm} categoryId={categoryId} />
      )}
    </div>
  );
};

export default Categories;
