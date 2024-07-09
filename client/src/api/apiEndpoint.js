import { createData, deleteData, getAllData, getData, updateData } from "../utils/apiUtils";

export const getCategories = () => getAllData("/categories");
export const getCategory = (id) => getData("/categories/", id);
export const createCategory = (category) => createData("/categories", category);
export const updateCategory = (id, category) =>
  updateData("/categories", id, category);
export const deleteCategory = (id) => deleteData("/categories", id);

export const getExpenses = () => getAllData("/expenses");
export const getExpense = (id) => getData("/expenses/", id);
export const createExpense = (expense) => createData("/expenses", expense);
export const updateExpense = (id, expense) =>
  updateData("/expenses", id, category);
export const deleteExpense = (id) => deleteData("/expenses", id);

export const getIncomes = () => getAllData("/incomes");
export const getIncome = (id) => getData("/incomes/", id);
export const createIncome = (income) => createData("/incomes", income);
export const updateIncome = (id, income) =>
  updateData("/incomes", id, category);
export const deleteIncome = (id) => deleteData("/incomes", id);
