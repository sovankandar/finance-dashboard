import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from '../features/transactions/transactionsSlice';
import roleReducer from '../features/roles/roleSlice';
import { loadState, saveState } from '../services/storage';

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    role: roleReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  saveState({
    transactions: state.transactions,
  });
});

export default store;
