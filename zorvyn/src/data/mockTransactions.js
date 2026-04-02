// Mock transactions for the finance dashboard
// Amounts are positive numbers; type determines income vs expense

const mockTransactions = [
  {
    id: 'tx-001',
    date: '2026-03-03',
    description: 'Monthly Salary',
    amount: 4200,
    category: 'Salary',
    type: 'income',
    account: 'Checking'
  },
  {
    id: 'tx-002',
    date: '2026-03-04',
    description: 'Groceries',
    amount: 86.45,
    category: 'Groceries',
    type: 'expense',
    account: 'Checking'
  },
  {
    id: 'tx-003',
    date: '2026-03-05',
    description: 'Coffee',
    amount: 6.2,
    category: 'Dining',
    type: 'expense',
    account: 'Checking'
  },
  {
    id: 'tx-004',
    date: '2026-03-06',
    description: 'Electricity Bill',
    amount: 74.9,
    category: 'Utilities',
    type: 'expense',
    account: 'Checking'
  },
  {
    id: 'tx-005',
    date: '2026-03-08',
    description: 'Gym Membership',
    amount: 29.99,
    category: 'Health',
    type: 'expense',
    account: 'Credit Card'
  },
  {
    id: 'tx-006',
    date: '2026-03-10',
    description: 'Freelance Project',
    amount: 850,
    category: 'Freelance',
    type: 'income',
    account: 'Checking'
  },
  {
    id: 'tx-007',
    date: '2026-03-12',
    description: 'Streaming Subscription',
    amount: 12.99,
    category: 'Entertainment',
    type: 'expense',
    account: 'Credit Card'
  },
  {
    id: 'tx-008',
    date: '2026-03-14',
    description: 'Gas',
    amount: 42.1,
    category: 'Transport',
    type: 'expense',
    account: 'Credit Card'
  },
  {
    id: 'tx-009',
    date: '2026-03-15',
    description: 'Dining Out',
    amount: 54.3,
    category: 'Dining',
    type: 'expense',
    account: 'Credit Card'
  },
  {
    id: 'tx-010',
    date: '2026-03-18',
    description: 'Online Course',
    amount: 120,
    category: 'Education',
    type: 'expense',
    account: 'Checking'
  },
  {
    id: 'tx-011',
    date: '2026-03-20',
    description: 'Rent',
    amount: 1200,
    category: 'Housing',
    type: 'expense',
    account: 'Checking'
  },
  {
    id: 'tx-012',
    date: '2026-03-22',
    description: 'Interest Earned',
    amount: 9.45,
    category: 'Interest',
    type: 'income',
    account: 'Savings'
  },
  {
    id: 'tx-013',
    date: '2026-03-24',
    description: 'Mobile Plan',
    amount: 38,
    category: 'Utilities',
    type: 'expense',
    account: 'Checking'
  },
  {
    id: 'tx-014',
    date: '2026-03-26',
    description: 'Groceries',
    amount: 94.6,
    category: 'Groceries',
    type: 'expense',
    account: 'Checking'
  },
  {
    id: 'tx-015',
    date: '2026-03-28',
    description: 'Bonus',
    amount: 500,
    category: 'Salary',
    type: 'income',
    account: 'Checking'
  },
  {
    id: 'tx-016',
    date: '2026-03-30',
    description: 'Pharmacy',
    amount: 22.7,
    category: 'Health',
    type: 'expense',
    account: 'Credit Card'
  },
  {
    id: 'tx-017',
    date: '2026-02-03',
    description: 'Monthly Salary',
    amount: 4100,
    category: 'Salary',
    type: 'income',
    account: 'Checking'
  },
  {
    id: 'tx-018',
    date: '2026-02-05',
    description: 'Groceries',
    amount: 78.2,
    category: 'Groceries',
    type: 'expense',
    account: 'Checking'
  },
  {
    id: 'tx-019',
    date: '2026-02-11',
    description: 'Restaurant',
    amount: 64.8,
    category: 'Dining',
    type: 'expense',
    account: 'Credit Card'
  },
  {
    id: 'tx-020',
    date: '2026-02-18',
    description: 'Rent',
    amount: 1200,
    category: 'Housing',
    type: 'expense',
    account: 'Checking'
  }
];

export default mockTransactions;
