import styles from './Paginator.module.css';

export const containerClasses = (className?: string) => {
  return [styles.paginator, className].filter(Boolean).join(' ');
};
