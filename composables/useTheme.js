export const useTheme = () => {
  const theme = ref('light');
  const isDark = computed(() => theme.value === 'dark');

  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        theme.value = savedTheme;
      } else {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches;
        theme.value = prefersDark ? 'dark' : 'light';
      }
      applyTheme();
    }
  };

  const applyTheme = () => {
    if (process.client) {
      document.documentElement.classList.toggle('dark', isDark.value);
      localStorage.setItem('theme', theme.value);
    }
  };

  const toggleTheme = () => {
    theme.value = isDark.value ? 'light' : 'dark';
    applyTheme();
  };

  const setTheme = (newTheme) => {
    theme.value = newTheme;
    applyTheme();
  };

  const watchSystemTheme = () => {
    if (process.client) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          theme.value = e.matches ? 'dark' : 'light';
          applyTheme();
        }
      });
    }
  };

  return {
    theme: readonly(theme),
    isDark,
    toggleTheme,
    setTheme,
    initTheme,
    watchSystemTheme,
  };
};
