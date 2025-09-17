import styles from './LibraryDashboard.module.css';

export function containerClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.container, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function componentGridClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.componentGrid, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function componentCardClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.componentCard, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function codeBlockClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.codeBlock, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function featureIconClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.featureIcon, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function featureCardClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.featureCard, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export default styles;