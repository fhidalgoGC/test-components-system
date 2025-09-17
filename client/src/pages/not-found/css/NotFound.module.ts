import { clsx } from 'clsx';

export const containerClasses = (
  theme: 'light' | 'dark',
  className?: string
) => clsx(
  'min-h-screen w-full flex items-center justify-center transition-colors duration-200',
  theme === 'light' ? 'bg-gray-50' : 'bg-gray-900',
  className
);

export const cardClasses = (theme: 'light' | 'dark') => clsx(
  'w-full max-w-md mx-4 transition-colors duration-200',
  theme === 'dark' && 'border-gray-700 bg-gray-800'
);