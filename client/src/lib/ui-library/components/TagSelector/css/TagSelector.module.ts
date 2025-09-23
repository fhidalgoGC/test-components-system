import styles from './TagSelector.module.css';
import type { TagSelectorSize } from '../types';

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

// Utility function to combine CSS module classes with parent Tailwind classes
export function combineWithParentClasses(moduleClasses: string, parentClasses?: string): string {
  if (!parentClasses) return moduleClasses;
  return `${moduleClasses} ${parentClasses}`;
}

export function chipClasses(
  theme: 'light' | 'dark',
  visible: boolean,
  selected: boolean,
  size: TagSelectorSize,
  isAll?: boolean,
  extra?: string,
  parentChipClasses?: string
) {
  const parts = [styles.chip, styles[theme]];
  
  // Add size class - handle both legacy sizes and new tam-X sizes
  if (styles[size]) {
    parts.push(styles[size]);
  } else {
    // Fallback to medium if size doesn't exist
    parts.push(styles.md);
  }
  
  if (isAll) {
    parts.push(styles.all);
  } else {
    parts.push(selected ? styles.selected : styles.unselected);
  }
  
  if (!visible) parts.push(styles.hidden);
  if (extra) parts.push(extra);
  
  // Combine with parent classes using utility function
  const baseClasses = parts.join(' ');
  return combineWithParentClasses(baseClasses, parentChipClasses);
}

export default styles;