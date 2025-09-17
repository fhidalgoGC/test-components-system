export const getStoredTheme = (): 'light' | 'dark' => {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }
  return 'light';
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const formatTitle = (title: string): string => {
  return title.trim();
};

export const formatDescription = (description: string): string => {
  return description.trim();
};

export const getNavbarClasses = (showBorder: boolean, theme: 'light' | 'dark'): string => {
  const baseClasses = 'navbar w-full bg-white dark:bg-gray-900 transition-colors duration-200';
  const borderClasses = showBorder ? 'border-b border-gray-200 dark:border-gray-700' : '';
  
  return `${baseClasses} ${borderClasses}`.trim();
};