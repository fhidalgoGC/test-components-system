import styles from './Carousel.module.css';

export const containerClasses = (className?: string) => {
  return [styles.carousel, className].filter(Boolean).join(' ');
};
