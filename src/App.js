// src/App.js
import React, { useState } from 'react';
import { getBlock, getTransaction } from './api';

function App() {
  const [searchType, setSearchType] = useState('block');
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      } else {
        data = await getTransaction(searchId);
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
      <h1>Blockchain Explorer</h1>
      <select onChange={(e) => setSearchType(e.target.value)} value={searchType}>
        <option value="block">Block</option>
        <option value="transaction">Transaction</option>
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
    </div>
  );
}

export default App;
