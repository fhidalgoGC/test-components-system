import { clsx } from 'clsx';

export const containerClasses = (
  theme: 'light' | 'dark',
  className?: string
) => clsx(
  'min-h-screen transition-colors duration-200',
  theme === 'light' ? 'bg-gray-50' : 'bg-gray-900',
  className
);

export const contentClasses = (theme: 'light' | 'dark') => clsx(
  'rounded-lg shadow-lg p-6 transition-colors duration-200',
  theme === 'light' 
    ? 'bg-white text-gray-900' 
    : 'bg-gray-800 text-white'
);