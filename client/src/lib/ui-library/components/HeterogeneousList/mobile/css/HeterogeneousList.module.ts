import styles from './HeterogeneousList.module.css';

export const containerClasses = (className?: string) => {
  const base = styles.container;
  return className ? `${base} ${className}` : base;
};

export const listClasses = (className?: string) => {
  const base = styles.list;
  return className ? `${base} ${className}` : base;
};

export const itemClasses = (className?: string) => {
  const base = styles.item;
  return className ? `${base} ${className}` : base;
};

export const dividerLineClasses = () => styles.dividerLine;

export const dividerComponentClasses = () => styles.dividerComponent;

export const emptyStateClasses = () => styles.emptyState;

export const loadingIndicatorClasses = () => styles.loadingIndicator;

export const endRenderClasses = () => styles.endRender;

export const errorStateClasses = () => styles.errorState;

export const sentinelClasses = () => styles.sentinel;
