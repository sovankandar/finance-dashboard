// Mock summary data for dashboard cards and charts

const mockSummary = {
  totals: {
    totalBalance: 6850.25,
    totalIncome: 9659.45,
    totalExpenses: 2809.2
  },
  trend: [
    { month: 'Nov', balance: 5200 },
    { month: 'Dec', balance: 5600 },
    { month: 'Jan', balance: 6100 },
    { month: 'Feb', balance: 6400 },
    { month: 'Mar', balance: 6850.25 }
  ],
  categoryBreakdown: [
    { category: 'Housing', amount: 2400 },
    { category: 'Groceries', amount: 258 },
    { category: 'Dining', amount: 125.3 },
    { category: 'Utilities', amount: 112.9 },
    { category: 'Transport', amount: 42.1 },
    { category: 'Health', amount: 52.69 },
    { category: 'Entertainment', amount: 12.99 },
    { category: 'Education', amount: 120 }
  ]
};

export default mockSummary;
