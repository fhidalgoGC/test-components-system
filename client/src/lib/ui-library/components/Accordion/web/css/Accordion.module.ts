import styles from './Accordion.module.css';

export const containerClasses = (className?: string) => {
  return [styles.accordion, className].filter(Boolean).join(' ');
};
