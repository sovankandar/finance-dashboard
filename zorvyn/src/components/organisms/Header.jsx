import { useState } from 'react';
import { toggleTheme, getTheme } from '../../utils/theme';
import { Menu } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRole, selectUsername } from '../../features/roles/selectors';
import { setUserRole, signOut } from '../../features/roles/roleSlice';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const [theme, setTheme] = useState(getTheme());
  const role = useAppSelector(selectRole);
  const username = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToggleTheme = () => {
    const next = toggleTheme();
    setTheme(next);
  };

  const handleRoleChange = (e) => {
    dispatch(setUserRole(e.target.value));
  };

  const handleLogout = () => {
    dispatch(signOut());
    navigate('/auth');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={toggleSidebar}
          className="p-2 -ml-2 text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={handleToggleTheme}
          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors relative"
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <iconify-icon icon={theme === 'dark' ? 'solar:sun-2-linear' : 'solar:moon-stars-linear'} width="22" height="22"></iconify-icon>
        </button>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
          <span className="text-sm font-medium text-slate-700">{username}</span>
          <span className="text-xs text-slate-500">({role === 'admin' ? 'Admin' : 'Viewer'})</span>
        </div>

        <select
          value={role}
          onChange={handleRoleChange}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium"
          aria-label="Switch role"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleLogout}
          className="px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
