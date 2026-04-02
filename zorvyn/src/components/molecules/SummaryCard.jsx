const SummaryCard = ({ title, amount, trend, trendValue, icon: Icon, colorClass = "text-indigo-600", bgClass = "bg-indigo-50" }) => {
  const isPositive = trend === 'up';

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${bgClass} ${colorClass}`}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
          <span className="text-[11px]">{isPositive ? '▲' : '▼'}</span>
          {trendValue}
        </div>
      </div>

      <div>
        <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">{amount}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
