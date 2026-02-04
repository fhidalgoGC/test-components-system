import styles from './List.module.css';

export const containerClasses = (className?: string) => {
  return [styles.list, className].filter(Boolean).join(' ');
};
