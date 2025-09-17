import styles from './ComponentLayout.module.css';

export function containerClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.container, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function tabsClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.tabs, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function tabClasses(
  theme: 'light' | 'dark',
  isActive: boolean,
  extra?: string
) {
  const parts = [styles.tab, styles[theme]];
  parts.push(isActive ? styles.tabActive : styles.tabInactive);
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

export function loadingClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.loading, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function errorClasses(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.error, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export default styles;