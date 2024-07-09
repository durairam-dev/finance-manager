import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Create a new data
async function createData(endpoint, payload) {
  try {
    const response = await apiClient.post(endpoint, payload);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Get all data
async function getAllData(endpoint) {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Get a single data by ID
async function getData(endpoint, id) {
  try {
    const response = await apiClient.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Update a data by ID
async function updateData(endpoint, id, payload) {
  try {
    const response = await apiClient.put(`${endpoint}/${id}`, payload);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Delete a data by ID
async function deleteData(endpoint, id) {
  try {
    const response = await apiClient.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Handle API errors
function handleApiError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("API Error:", error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Network Error:", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error:", error.message);
  }
  throw error; // Optionally rethrow the error if you want it to propagate
}

export {
  createData,
  getAllData,
  getData,
  updateData,
  deleteData,
};
