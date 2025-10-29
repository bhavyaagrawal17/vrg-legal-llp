// src/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
 // change later to your deployed backend URL

const api = {
  contact: async (data) => {
    const res = await axios.post(`${API_BASE_URL}/contact`, data);
    return res.data;
  },

  joinUs: async (formData) => {
    const res = await axios.post(`${API_BASE_URL}/api/join-us`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};


export default api;