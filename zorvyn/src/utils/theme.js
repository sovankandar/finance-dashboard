const THEME_KEY = 'theme';

const applyTheme = (theme) => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

const getTheme = () => {
  return localStorage.getItem(THEME_KEY) || 'light';
};

const setTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
};

const toggleTheme = () => {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
};

export { getTheme, setTheme, applyTheme, toggleTheme };
