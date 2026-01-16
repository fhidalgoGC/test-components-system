import styles from './LayoutRow.module.css';

export const containerClasses = (className?: string) => {
  return [styles.layoutrow, className].filter(Boolean).join(' ');
};
