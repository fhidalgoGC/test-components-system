import styles from './Modal.module.css';

export const containerClasses = (className?: string) => {
  return [styles.modal, className].filter(Boolean).join(' ');
};
