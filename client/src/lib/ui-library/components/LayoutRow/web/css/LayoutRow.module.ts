import styles from './LayoutRow.module.scss';

export const containerClasses = (className?: string) => {
  return [styles.layoutrow, className].filter(Boolean).join(' ');
};
