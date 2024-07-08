// src/App.js
import React, { useEffect, useState } from 'react';
import { getBlock, getTransaction, getAccount, getRecentBlocks, getRecentTransactions } from './api';
import { filterTransactionData, filterAccountData } from './utils';

function App() {
  const [searchType, setSearchType] = useState('block');
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentBlocks, setRecentBlocks] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    const fetchRecentData = async () => {
      try {
        const blocks = await getRecentBlocks();
        setRecentBlocks(blocks);
        const transactions = await getRecentTransactions();
        setRecentTransactions(transactions);
      } catch (error) {
        console.error("Failed to fetch recent data:", error);
      }
    };

    fetchRecentData();
  }, []);

  const handleInputChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (searchType === 'block') {
        data = await getBlock(searchId);
      } else if (searchType === 'transaction') {
        data = await getTransaction(searchId);
        data = filterTransactionData(data)
      } else {
        data = await getAccount(searchId);
      }
      setResult(data);
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Diamante Blockchain Explorer</h1>
      <select onChange={(e) => setSearchType(e.target.value)} value={searchType}>
        <option value="block">Block</option>
        <option value="transaction">Transaction</option>
        <option value="account">Account</option>
      </select>
      <input
        type="text"
        value={searchId}
        onChange={handleInputChange}
        placeholder={`Enter ${searchType} ID`}
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {result && (
        <div>
          <h2>Result</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      <h2>Recent Blocks</h2>
      <ul>
        {recentBlocks.map(block => (
          <li key={block.id}>Block {block.id}: {block.hash}</li>
        ))}
      </ul>
      <h2>Recent Transactions</h2>
      <ul>
        {recentTransactions.map(tx => (
          <li key={tx.id}>Transaction {tx.id}: {tx.hash}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
