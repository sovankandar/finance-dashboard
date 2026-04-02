import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRole } from '../roles/selectors';
import { setUserRole } from '../roles/roleSlice';

const AuthPage = () => {
  const [mode, setMode] = useState('signin');
  const role = useAppSelector(selectRole);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${mode === 'signin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${mode === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Sign Up
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="role" className="text-xs font-medium text-slate-500">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => dispatch(setUserRole(e.target.value))}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {mode === 'signin' ? (
          <SignInForm onSuccess={handleSuccess} role={role} />
        ) : (
          <SignUpForm onSuccess={handleSuccess} role={role} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
