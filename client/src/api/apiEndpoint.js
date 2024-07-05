import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getCategories = () => axios.get(`${API_URL}/categories`);
export const createCategory = (category) =>
  axios.post(`${API_URL}/categories`, category);
export const updateCategory = (id, category) =>
  axios.put(`${API_URL}/categories/${id}`, category);
export const deleteCategory = (id) =>
  axios.delete(`${API_URL}/categories/${id}`);

export const getExpenses = () => axios.get(`${API_URL}/expenses`);
export const createExpense = (expense) =>
  axios.post(`${API_URL}/expenses`, expense);
export const updateExpense = (id, expense) =>
  axios.put(`${API_URL}/expenses/${id}`, expense);
export const deleteExpense = (id) => axios.delete(`${API_URL}/expenses/${id}`);

export const getIncomes = () => axios.get(`${API_URL}/incomes`);
export const createIncome = (income) =>
  axios.post(`${API_URL}/incomes`, income);
export const updateIncome = (id, income) =>
  axios.put(`${API_URL}/incomes/${id}`, income);
export const deleteIncome = (id) => axios.delete(`${API_URL}/incomes/${id}`);
