import styles from './FloatingMenu.module.css';

export const containerClasses = (className?: string) => {
  return [styles.floatingmenu, className].filter(Boolean).join(' ');
};
