import styles from './GoogleMap.module.css';

export const containerClasses = (className?: string) => {
  return [styles.googlemap, className].filter(Boolean).join(' ');
};
