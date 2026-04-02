const selectTransactions = (state) => state.transactions.items;
const selectTransactionFilters = (state) => state.transactions.filters;
const selectTransactionsStatus = (state) => state.transactions.status;
const selectTransactionsError = (state) => state.transactions.error;

export { selectTransactions, selectTransactionFilters, selectTransactionsStatus, selectTransactionsError };
