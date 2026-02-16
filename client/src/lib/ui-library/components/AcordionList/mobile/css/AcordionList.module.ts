import styles from './AcordionList.module.css';

export const containerClasses = (className?: string) => {
  return [styles.acordionlist, className].filter(Boolean).join(' ');
};
