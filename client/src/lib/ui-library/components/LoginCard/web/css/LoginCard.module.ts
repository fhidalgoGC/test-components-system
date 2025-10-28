import styles from './LoginCard.module.css';

export const containerClasses = (className?: string) => {
  return [styles.logincard, className].filter(Boolean).join(' ');
};
