const AUTH_KEY = 'auth';
const ROLE_KEY = 'role';
const USERNAME_KEY = 'username';

const setAuth = (value) => {
  localStorage.setItem(AUTH_KEY, value ? 'true' : 'false');
};

const getAuth = () => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

const isAuthed = () => {
  return getAuth();
};

const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
};

const setRole = (role) => {
  localStorage.setItem(ROLE_KEY, role);
};

const getRole = () => {
  return localStorage.getItem(ROLE_KEY) || 'viewer';
};

const clearRole = () => {
  localStorage.removeItem(ROLE_KEY);
};

const setUsername = (username) => {
  localStorage.setItem(USERNAME_KEY, username);
};

const getUsername = () => {
  return localStorage.getItem(USERNAME_KEY) || 'User';
};

const clearUsername = () => {
  localStorage.removeItem(USERNAME_KEY);
};

export { setAuth, getAuth, isAuthed, clearAuth, setRole, getRole, clearRole, setUsername, getUsername, clearUsername };
