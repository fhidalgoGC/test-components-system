import styles from './Sidebar.module.css';

export function classes(
  theme: 'light' | 'dark',
  extra?: string
) {
  const parts = [styles.root, styles[theme]];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function headerClasses(extra?: string) {
  const parts = [styles.header];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function headerContentClasses(extra?: string) {
  const parts = [styles.headerContent];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function logoClasses(extra?: string) {
  const parts = [styles.logo];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function brandTextClasses(extra?: string) {
  const parts = [styles.brandText];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function titleClasses(extra?: string) {
  const parts = [styles.title];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function subtitleClasses(extra?: string) {
  const parts = [styles.subtitle];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function navClasses(extra?: string) {
  const parts = [styles.nav];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function navListClasses(extra?: string) {
  const parts = [styles.navList];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function navItemClasses(extra?: string) {
  const parts = [styles.navItem];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function navLinkClasses(isActive: boolean, extra?: string) {
  const parts = [styles.navLink];
  if (isActive) parts.push(styles.active);
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function navIconClasses(extra?: string) {
  const parts = [styles.navIcon];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function navTextClasses(extra?: string) {
  const parts = [styles.navText];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function expandIconClasses(isExpanded: boolean, extra?: string) {
  const parts = [styles.expandIcon];
  if (isExpanded) parts.push(styles.expanded);
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function subListClasses(extra?: string) {
  const parts = [styles.subList];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function subItemClasses(extra?: string) {
  const parts = [styles.subItem];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function subLinkClasses(isActive: boolean, extra?: string) {
  const parts = [styles.subLink];
  if (isActive) parts.push(styles.active);
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function footerClasses(extra?: string) {
  const parts = [styles.footer];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function footerControlsClasses(extra?: string) {
  const parts = [styles.footerControls];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function controlRowClasses(extra?: string) {
  const parts = [styles.controlRow];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function controlButtonClasses(extra?: string) {
  const parts = [styles.controlButton];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function controlIconClasses(extra?: string) {
  const parts = [styles.controlIcon];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export function selectClasses(extra?: string) {
  const parts = [styles.select];
  if (extra) parts.push(extra);
  return parts.join(' ');
}

export default styles;