import mockTransactions from '../data/mockTransactions';

const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTransactions);
    }, 800);
  });
};

export { fetchTransactions };
