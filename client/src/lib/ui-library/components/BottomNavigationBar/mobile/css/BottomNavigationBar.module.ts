import styles from './BottomNavigationBar.module.css';

export const containerClasses = (className?: string) => {
  return [styles.bottomnavigationbar, className].filter(Boolean).join(' ');
};
