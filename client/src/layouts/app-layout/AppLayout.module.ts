import styles from './AppLayout.module.css';

export function containerClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.container, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function mainClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.main, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function contentClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.content, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export default styles;