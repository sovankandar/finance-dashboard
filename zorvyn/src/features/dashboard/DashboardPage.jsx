import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import SummaryCard from '../../components/molecules/SummaryCard';
import mockSummary from '../../data/mockSummary';
import mockTransactions from '../../data/mockTransactions';

const formatShortDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const mapTransactions = (items) =>
  items.map((tx, index) => ({
    id: tx.id,
    name: tx.description,
    merchant: tx.account,
    category: tx.category,
    date: formatShortDate(tx.date),
    status: index % 4 === 0 ? 'Pending' : 'Completed',
    amount: tx.amount,
    type: tx.type,
    icon: tx.type === 'income' ? 'solar:money-bag-linear' : 'solar:card-send-linear'
  }));

const chartData = mockSummary.trend.map((item) => ({
  name: item.month,
  balance: item.balance
}));

const expenseData = mockSummary.categoryBreakdown;
const recentTransactions = mapTransactions(mockTransactions);

const DashboardPage = () => {
  return (
    <div className="space-y-6 animate-fade-up">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Here's what's happening with your finances today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <iconify-icon icon="solar:calendar-linear" width="18" height="18"></iconify-icon>
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
            <iconify-icon icon="solar:add-circle-linear" width="18" height="18"></iconify-icon>
            New Transfer
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <SummaryCard
          title="Total Balance"
          amount={`$${mockSummary.totals.totalBalance.toLocaleString()}`}
          trend="up"
          trendValue="12.5%"
          icon={Wallet}
        />
        <SummaryCard
          title="Total Income"
          amount={`$${mockSummary.totals.totalIncome.toLocaleString()}`}
          trend="up"
          trendValue="8.2%"
          icon={TrendingUp}
          colorClass="text-emerald-600"
          bgClass="bg-emerald-50"
        />
        <SummaryCard
          title="Total Expenses"
          amount={`$${mockSummary.totals.totalExpenses.toLocaleString()}`}
          trend="down"
          trendValue="3.1%"
          icon={TrendingDown}
          colorClass="text-rose-600"
          bgClass="bg-rose-50"
        />
        <SummaryCard
          title="Total Savings"
          amount="$3,250.00"
          trend="up"
          trendValue="5.4%"
          icon={PiggyBank}
          colorClass="text-amber-600"
          bgClass="bg-amber-50"
        />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-semibold text-slate-900">Balance Trend</h2>
            <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400">
              <iconify-icon icon="solar:menu-dots-bold" width="20" height="20"></iconify-icon>
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']}
                />
                <Area type="monotone" dataKey="balance" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-semibold text-slate-900">Spending Breakdown</h2>
            <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400">
              <iconify-icon icon="solar:menu-dots-bold" width="20" height="20"></iconify-icon>
            </button>
          </div>
          <div className="flex-1 h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenseData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 13, fontWeight: 500 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} formatter={(value) => [`$${value}`, 'Amount']} />
                <Bar dataKey="amount" fill="#38bdf8" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-base font-semibold text-slate-900">Recent Transactions</h2>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">Transaction</th>
                <th className="py-4 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-200">
                        <iconify-icon icon={tx.icon} width="20" height="20"></iconify-icon>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{tx.name}</div>
                        <div className="text-xs text-slate-500">{tx.merchant}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{tx.date}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{tx.category}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                      ${tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                        tx.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                        'bg-slate-100 text-slate-700'}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className={`py-4 px-6 text-sm font-medium text-right ${tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

