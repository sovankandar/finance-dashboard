import { createSlice } from '@reduxjs/toolkit';
import { getAuth, getRole, getUsername, setAuth, setRole, setUsername, clearAuth, clearRole, clearUsername } from '../../utils/auth';

const initialState = {
  isAuthenticated: getAuth(),
  role: getRole(),
  username: getUsername(),
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
      setAuth(action.payload);
    },
    setUserRole(state, action) {
      state.role = action.payload;
      setRole(action.payload);
    },
    setUsernameValue(state, action) {
      state.username = action.payload;
      setUsername(action.payload);
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.role = 'viewer';
      state.username = 'User';
      clearAuth();
      clearRole();
      clearUsername();
    },
  },
});

export const { setAuthenticated, setUserRole, setUsernameValue, signOut } = roleSlice.actions;

export default roleSlice.reducer;
