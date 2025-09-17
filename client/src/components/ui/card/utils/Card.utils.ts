import styles from "../css/Card.module.css";

export function cardClasses(
  theme: 'light' | 'dark' = 'light',
  extra?: string
) {
  const parts = [styles.card, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function cardHeaderClasses(
  theme: 'light' | 'dark' = 'light',
  extra?: string
) {
  const parts = [styles.cardHeader, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function cardTitleClasses(
  theme: 'light' | 'dark' = 'light',
  extra?: string
) {
  const parts = [styles.cardTitle, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function cardDescriptionClasses(
  theme: 'light' | 'dark' = 'light',
  extra?: string
) {
  const parts = [styles.cardDescription, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function cardContentClasses(
  theme: 'light' | 'dark' = 'light',
  extra?: string
) {
  const parts = [styles.cardContent, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function cardFooterClasses(
  theme: 'light' | 'dark' = 'light',
  extra?: string
) {
  const parts = [styles.cardFooter, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}