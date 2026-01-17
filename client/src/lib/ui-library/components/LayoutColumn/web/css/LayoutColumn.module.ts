import styles from './LayoutColumn.module.css';

export const containerClasses = (className?: string) => {
  return [styles.layoutcolumn, className].filter(Boolean).join(' ');
};
