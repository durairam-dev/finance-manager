import {
  createData,
  deleteData,
  getAllData,
  getData,
  updateData,
} from "../utils/apiUtils";

export const getAllCategories = () => getAllData("/categories/all");
export const getCategories = (page, limit) =>
  getAllData(`/categories?page=${page}&limit=${limit}`);
export const getCategory = (id) => getData("/categories/", id);
export const createCategory = (category) => createData("/categories", category);
export const updateCategory = (id, category) =>
  updateData("/categories", id, category);
export const deleteCategory = (id) => deleteData("/categories", id);

export const getAllExpenses = () => getAllData("/expenses/all");
export const getExpenses = (page, limit) =>
  getAllData(`/expenses?page=${page}&limit=${limit}`);
export const getExpense = (id) => getData("/expenses/", id);
export const createExpense = (expense) => createData("/expenses", expense);
export const updateExpense = (id, expense) =>
  updateData("/expenses", id, expense);
export const deleteExpense = (id) => deleteData("/expenses", id);

export const getAllIncomes = () => getAllData("/incomes/all");
export const getIncomes = (page, limit) =>
  getAllData(`/incomes?page=${page}&limit=${limit}`);
export const getIncome = (id) => getData("/incomes/", id);
export const createIncome = (income) => createData("/incomes", income);
export const updateIncome = (id, income) => updateData("/incomes", id, income);
export const deleteIncome = (id) => deleteData("/incomes", id);
