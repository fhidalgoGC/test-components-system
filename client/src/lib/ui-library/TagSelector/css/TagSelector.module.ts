import styles from './TagSelector.module.css';

export function containerClasses(
  theme: 'light' | 'dark',
  visible: boolean,
  extra?: string
) {
  const parts = [styles.container, styles[theme]];
  if (!visible) parts.push(styles.hidden);
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function chipClasses(
  theme: 'light' | 'dark',
  visible: boolean,
  selected: boolean,
  size: 'sm' | 'md' | 'lg',
  isAll?: boolean,
  extra?: string
) {
  const parts = [styles.chip, styles[theme], styles[size]];
  
  if (isAll) {
    parts.push(styles.all);
  } else {
    parts.push(selected ? styles.selected : styles.unselected);
  }
  
  if (!visible) parts.push(styles.hidden);
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export default styles;