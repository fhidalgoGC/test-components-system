import { clsx } from 'clsx';

export const containerClasses = (
  theme: 'light' | 'dark',
  className?: string
) => clsx(
  'transition-colors duration-200',
  theme === 'dark' && 'dark',
  className
);