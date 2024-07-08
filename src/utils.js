
export const filterAccountData = (data) => {
    return {
      balances: data.balances,
      sequence: data.sequence,
      last_modified_ledger: data.last_modified_ledger,
    };
  };
  
  export const filterTransactionData = (transactions) => {
    return transactions.slice(0, 5).map(tx => ({
      id: tx.id,
      hash: tx.hash,
      created_at: tx.created_at,
      operation_count: tx.operation_count,
      source_account: tx.source_account,
    }));
  };
  