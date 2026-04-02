import mockSummary from '../../data/mockSummary';
import mockInsights from '../../data/mockInsights';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

const COLORS = ['#4f46e5', '#38bdf8', '#fbbf24', '#f43f5e', '#a855f7', '#2dd4bf'];

const InsightsPage = () => {
  const trendData = mockSummary.trend.map((item) => ({
    name: item.month,
    balance: item.balance
  }));

  const expenseData = mockSummary.categoryBreakdown;

  if (!trendData.length || !expenseData.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200">
        <iconify-icon icon="solar:chart-square-linear" width="48" height="48" class="text-slate-300 mb-4"></iconify-icon>
        <h3 className="text-lg font-semibold text-slate-900">No Data Available</h3>
        <p className="text-sm text-slate-500 mt-1">We need more financial history to generate your insights.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Financial Insights</h1>
        <p className="text-sm text-slate-500 mt-1">Quick observations and category breakdowns based on your activity.</p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockInsights.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <iconify-icon icon="solar:lightbulb-bolt-linear" width="24" height="24"></iconify-icon>
              </div>
              <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900 mb-2">{item.value}</p>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">Balance Trend</h2>
            <p className="text-xs text-slate-500">Trailing months snapshot</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalanceInsights" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="balance" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorBalanceInsights)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">Spending Distribution</h2>
            <p className="text-xs text-slate-500">Breakdown by category</p>
          </div>
          <div className="flex-1 h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="45%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="amount"
                  nameKey="category"
                  stroke="none"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#64748b' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;

