import styles from './LibraryDashboard.module.css';

export function containerClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.container, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function headerClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.header, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function titleClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.title, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function subtitleClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.subtitle, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function gridClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.grid, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function cardClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.card, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export default styles;