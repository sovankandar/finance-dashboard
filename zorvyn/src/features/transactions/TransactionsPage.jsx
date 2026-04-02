import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectTransactions,
  selectTransactionFilters,
  selectTransactionsStatus,
  selectTransactionsError,
} from './selectors';
import {
  setSearchQuery,
  setFilterType,
  setSortBy,
  setCategory,
  setDateFrom,
  setDateTo,
  setGroupBy,
  loadTransactions,
} from './transactionsSlice';
import { selectRole } from '../roles/selectors';
import { exportCSV, exportJSON } from '../../utils/export';

const buildTransactions = (items) =>
  items.map((tx, index) => ({
    id: tx.id,
    name: tx.description,
    merchant: tx.account,
    category: tx.category,
    date: new Date(tx.date),
    timestamp: new Date(tx.date).getTime(),
    amount: tx.amount,
    type: tx.type,
    status: index % 4 === 0 ? 'Pending' : 'Completed',
    icon: tx.type === 'income' ? 'solar:money-bag-linear' : 'solar:card-send-linear'
  }));

const formatDate = (date) =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const TransactionsPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectTransactions);
  const filters = useAppSelector(selectTransactionFilters);
  const status = useAppSelector(selectTransactionsStatus);
  const error = useAppSelector(selectTransactionsError);
  const role = useAppSelector(selectRole);
  const isAdmin = role === 'admin';

  useEffect(() => {
    if (status === 'idle' && items.length === 0) {
      dispatch(loadTransactions());
    }
  }, [status, items.length, dispatch]);

  const baseTransactions = useMemo(() => buildTransactions(items), [items]);

  const categories = useMemo(() => {
    const set = new Set(items.map((t) => t.category));
    return ['all', ...Array.from(set)];
  }, [items]);

  
  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...baseTransactions];

    
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (tx) =>
          tx.name.toLowerCase().includes(query) ||
          tx.merchant.toLowerCase().includes(query) ||
          tx.category.toLowerCase().includes(query)
      );
    }

    
    if (filters.filterType !== 'all') {
      result = result.filter((tx) => tx.type === filters.filterType);
    }

    
    if (filters.category !== 'all') {
      result = result.filter((tx) => tx.category === filters.category);
    }

    
    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom).getTime();
      result = result.filter((tx) => tx.timestamp >= from);
    }
    if (filters.dateTo) {
      const to = new Date(filters.dateTo).getTime();
      result = result.filter((tx) => tx.timestamp <= to);
    }

    
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-desc':
          return b.timestamp - a.timestamp;
        case 'date-asc':
          return a.timestamp - b.timestamp;
        case 'amount-desc':
          return Math.abs(b.amount) - Math.abs(a.amount);
        case 'amount-asc':
          return Math.abs(a.amount) - Math.abs(b.amount);
        default:
          return 0;
      }
    });

    return result;
  }, [filters, baseTransactions]);

  const groupedByCategory = useMemo(() => {
    if (filters.groupBy !== 'category') return [];
    const totals = {};
    filteredAndSortedTransactions.forEach((tx) => {
      totals[tx.category] = (totals[tx.category] || 0) + (tx.type === 'expense' ? tx.amount : 0);
    });
    return Object.entries(totals).map(([category, amount]) => ({ category, amount }));
  }, [filteredAndSortedTransactions, filters.groupBy]);

  const handleExport = (type) => {
    const rows = filteredAndSortedTransactions.map((tx) => ({
      id: tx.id,
      date: tx.date.toISOString().slice(0, 10),
      description: tx.name,
      account: tx.merchant,
      category: tx.category,
      type: tx.type,
      amount: tx.amount,
      status: tx.status,
    }));

    if (type === 'csv') exportCSV(rows);
    if (type === 'json') exportJSON(rows);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Transactions</h1>
          <p className="text-sm text-slate-500 mt-1">View and manage all your financial activity.</p>
        </div>

        
        <div className="flex flex-wrap items-center gap-3">
          <span className={`px-3 py-2 rounded-lg text-sm font-medium border ${isAdmin ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
            Role: {isAdmin ? 'Admin' : 'Viewer'}
          </span>
          {isAdmin && (
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
              Add Transaction
            </button>
          )}
          <button
            onClick={() => dispatch(loadTransactions())}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            Refresh API
          </button>
        </div>
      </div>

      
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <iconify-icon
              icon="solar:magnifer-linear"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              width="20"
              height="20"
            ></iconify-icon>
            <input
              type="text"
              placeholder="Search by name, merchant, or category..."
              value={filters.searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-900"
            />
          </div>

          <div className="flex w-full md:w-auto gap-3">
            <select
              value={filters.filterType}
              onChange={(e) => dispatch(setFilterType(e.target.value))}
              className="flex-1 md:w-36 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 font-medium cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="income">Income Only</option>
              <option value="expense">Expenses Only</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="flex-1 md:w-40 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 font-medium cursor-pointer"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <select
            value={filters.category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 font-medium cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>

          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => dispatch(setDateFrom(e.target.value))}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700"
          />

          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => dispatch(setDateTo(e.target.value))}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700"
          />

          <select
            value={filters.groupBy}
            onChange={(e) => dispatch(setGroupBy(e.target.value))}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 font-medium cursor-pointer"
          >
            <option value="none">No Grouping</option>
            <option value="category">Group by Category</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleExport('csv')}
            className="px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={() => handleExport('json')}
            className="px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors"
          >
            Export JSON
          </button>
        </div>
      </div>

      {status === 'loading' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-sm text-slate-500">
          Loading transactions from mock API...
        </div>
      )}

      {status === 'failed' && (
        <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-6 text-sm text-rose-600">
          {error}
        </div>
      )}

      {filters.groupBy === 'category' && groupedByCategory.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Grouped by Category</h3>
          <div className="flex flex-wrap gap-2">
            {groupedByCategory.map((group) => (
              <span key={group.category} className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                {group.category}: ${group.amount.toFixed(2)}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
        {filteredAndSortedTransactions.length > 0 ? (
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Transaction</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAndSortedTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors border ${tx.type === 'income' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-100 group-hover:bg-slate-100'}`}>
                          <iconify-icon icon={tx.icon} width="20" height="20"></iconify-icon>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{tx.name}</div>
                          <div className="text-xs text-slate-500">{tx.merchant}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600 font-medium">{formatDate(tx.date)}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                        ${tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          tx.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          'bg-slate-50 text-slate-700 border-slate-200'}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Completed' ? 'bg-emerald-500' : tx.status === 'Pending' ? 'bg-amber-500' : 'bg-slate-400'}`}></span>
                        {tx.status}
                      </span>
                    </td>
                    <td className={`py-4 px-6 text-sm font-semibold text-right ${tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4 border border-slate-100">
              <iconify-icon icon="solar:folder-error-linear" width="32" height="32"></iconify-icon>
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">No transactions found</h3>
            <p className="text-sm text-slate-500 max-w-sm">
              We couldn't find any transactions matching your current filters. Try adjusting your search or filter settings.
            </p>
            <button
              onClick={() => { dispatch(setSearchQuery('')); dispatch(setFilterType('all')); dispatch(setCategory('all')); dispatch(setDateFrom('')); dispatch(setDateTo('')); dispatch(setGroupBy('none')); }}
              className="mt-6 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;

