import styles from './Navbar.module.css';

export function classes(
  theme: 'light' | 'dark',
  withBorder: boolean,
  extra?: string
) {
  const parts = [styles.root, styles[theme]];
  if (withBorder) parts.push(styles.withBorder);
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function containerClasses(extra?: string) {
  const parts = [styles.container];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function contentClasses(extra?: string) {
  const parts = [styles.content];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function brandClasses(extra?: string) {
  const parts = [styles.brand];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function titleClasses(theme: 'light' | 'dark', extra?: string) {
  const parts = [styles.title, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function descriptionClasses(theme: 'light' | 'dark', extra?: string) {
  const parts = [styles.description, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export default styles;