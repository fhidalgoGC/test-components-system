import type { LoadingSize, LoadingOverlay } from '../../web/types/Loading.type';
import styles from './SelfSpinner.module.css';

const sizeMap: Record<string, string> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
};

interface SelfSpinnerProps {
  size?: LoadingSize;
  label?: string;
  overlay?: LoadingOverlay;
}

export function SelfSpinner({ size = 'md', label, overlay }: SelfSpinnerProps) {
  const spinnerClasses = [
    styles.spinner,
    sizeMap[size] || styles.sizeMd,
  ].filter(Boolean).join(' ');

  const labelClasses = [
    styles.label,
    overlay === 'dark' ? styles.labelDark : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <div className={spinnerClasses} data-testid="loading-spinner" />
      {label && <span className={labelClasses} data-testid="loading-label">{label}</span>}
    </>
  );
}
