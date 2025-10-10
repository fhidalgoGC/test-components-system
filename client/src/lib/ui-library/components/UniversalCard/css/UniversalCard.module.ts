import styles from './UniversalCard.module.css';

export const containerClasses = (className?: string) => {
  return [styles.universalcard, className].filter(Boolean).join(' ');
};
