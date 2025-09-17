import styles from "../css/Input.module.css";

export function inputClasses(
  theme: 'light' | 'dark' = 'light',
  extra?: string
) {
  const parts = [styles.input, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}