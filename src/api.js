// src/api.js
import axios from 'axios';

const API_BASE_URL = "https://diamtestnet.diamcircle.io";  // Replace with actual Diamante API base URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const getBlock = async (blockId) => {
  try {
    const response = await apiClient.get(`/ledgers/${blockId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching block:", error);
    throw error;
  }
};

export const getTransaction = async (transactionId) => {
  try {
    const response = await apiClient.get(`/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw error;
  }
};

// Add more API interactions as needed
