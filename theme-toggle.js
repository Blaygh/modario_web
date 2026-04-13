(() => {
  const THEME_KEY = 'modario-theme';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';

  const applyTheme = (theme) => {
    const nextTheme = theme === DARK_THEME ? DARK_THEME : LIGHT_THEME;
    document.body.dataset.theme = nextTheme;
    return nextTheme;
  };

  const getStoredTheme = () => window.localStorage.getItem(THEME_KEY);

  const getInitialTheme = () => getStoredTheme() || LIGHT_THEME;

  const updateToggleLabel = (toggle, theme) => {
    const isDark = theme === DARK_THEME;
    toggle.textContent = isDark ? 'Light' : 'Dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  };

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;

    let currentTheme = applyTheme(getInitialTheme());
    updateToggleLabel(toggle, currentTheme);

    toggle.addEventListener('click', () => {
      currentTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
      currentTheme = applyTheme(currentTheme);
      window.localStorage.setItem(THEME_KEY, currentTheme);
      updateToggleLabel(toggle, currentTheme);
    });
  });
})();
