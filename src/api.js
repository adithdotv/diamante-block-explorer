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
    return response.data
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw error;
  }
};

export const getAccount = async (accountId) => {
    try {
      const response = await apiClient.get(`/accounts/${accountId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching account:", error);
      throw error;
    }
  };

  
  export const getRecentBlocks = async () => {
    try {
      const response = await apiClient.get(`/ledgers`);
      console.log("block: "+response.data)
      return response.data._embedded.records;
    } catch (error) {
      console.error("Error fetching recent blocks:", error);
      throw error;
    }
  };
  
  export const getRecentTransactions = async () => {
    try {
      const response = await apiClient.get(`/transactions`);
      return response.data._embedded.records;
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
      throw error;
    }
  };