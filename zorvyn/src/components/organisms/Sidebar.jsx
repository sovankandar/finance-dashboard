import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/', icon: 'solar:widget-5-linear' },
  { name: 'Transactions', path: '/transactions', icon: 'solar:card-transfer-linear' },
  { name: 'Insights', path: '/insights', icon: 'solar:chart-square-linear' },
  { name: 'Settings', path: '/settings', icon: 'solar:settings-linear' },
];

const Sidebar = ({ onClose }) => {
  return (
    <aside className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-indigo-200">
            <iconify-icon icon="solar:infinity-bold" width="20" height="20"></iconify-icon>
          </div>
          <span className="text-lg tracking-tight font-semibold text-slate-900">Nexus<span className="text-indigo-600">Fin</span></span>
        </div>

        <button
          onClick={onClose}
          className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
        >
          <iconify-icon icon="solar:close-circle-linear" width="22" height="22"></iconify-icon>
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3 px-2">Menu</div>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
              ${isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
            `}
          >
            {({ isActive }) => (
              <>
                <iconify-icon
                  icon={isActive ? item.icon.replace('-linear', '-bold') : item.icon}
                  width="20"
                  height="20"
                  class={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}
                ></iconify-icon>
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
