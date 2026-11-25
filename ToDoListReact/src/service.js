

import axios from 'axios';

const apiUrl = "https://localhost:7019";
axios.interceptors.response.use(
  (response) => response,

  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);
axios.defaults.baseURL = apiUrl;

const service = {
  getTasks: async () => {
    const result = await axios.get("/items");
    return result.data;
  },

  addTask: async (name) => {
    const result = await axios.post("/items", {
      name: name,
      isComplete: false
    });

    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    const result = await axios.get(`/items/${id}`);
    const task = result.data;

    await axios.put(`/items/${id}`, {
      ...task,
      isComplete: isComplete
    });
  },

  deleteTask: async (id) => {
    await axios.delete(`/items/${id}`);
  }
};

export default service;
