import styles from './Button.module.css';

export function classes(
  theme: 'light' | 'dark',
  visible: boolean,
  intent: 'primary' | 'secondary' | 'danger',
  size: 'sm' | 'md' | 'lg',
  extra?: string
) {
  const parts = [styles.root, styles[theme], styles[intent], styles[size]];
  if (!visible) parts.push(styles.hidden);
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export default styles;
