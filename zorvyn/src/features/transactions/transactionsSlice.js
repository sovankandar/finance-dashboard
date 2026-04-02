import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTransactions } from '../../services/mockApi';
import mockTransactions from '../../data/mockTransactions';

const initialState = {
  items: mockTransactions,
  filters: {
    searchQuery: '',
    filterType: 'all',
    sortBy: 'date-desc',
    category: 'all',
    dateFrom: '',
    dateTo: '',
    groupBy: 'none',
  },
  status: 'idle',
  error: null,
};

const loadTransactions = createAsyncThunk('transactions/load', async () => {
  const data = await fetchTransactions();
  return data;
});

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.filters.searchQuery = action.payload;
    },
    setFilterType(state, action) {
      state.filters.filterType = action.payload;
    },
    setSortBy(state, action) {
      state.filters.sortBy = action.payload;
    },
    setCategory(state, action) {
      state.filters.category = action.payload;
    },
    setDateFrom(state, action) {
      state.filters.dateFrom = action.payload;
    },
    setDateTo(state, action) {
      state.filters.dateTo = action.payload;
    },
    setGroupBy(state, action) {
      state.filters.groupBy = action.payload;
    },
    addTransaction(state, action) {
      state.items = [action.payload, ...state.items];
    },
    setTransactions(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTransactions.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load transactions';
      });
  },
});

export const {
  setSearchQuery,
  setFilterType,
  setSortBy,
  setCategory,
  setDateFrom,
  setDateTo,
  setGroupBy,
  addTransaction,
  setTransactions,
} = transactionsSlice.actions;

export { loadTransactions };

export default transactionsSlice.reducer;
