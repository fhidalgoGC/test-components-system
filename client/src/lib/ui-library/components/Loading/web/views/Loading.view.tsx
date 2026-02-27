import type { LoadingProps } from '../types/Loading.type';
import styles from '../css/Loading.module.css';

const sizeMap: Record<string, string> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
};

const overlayMap: Record<string, string> = {
  transparent: styles.overlayTransparent,
  light: styles.overlayLight,
  dark: styles.overlayDark,
  none: styles.overlayNone,
};

export function Loading({
  state = 'loading',
  overlay = 'transparent',
  coverage = 'component',
  size = 'md',
  label,
  className,
}: LoadingProps) {
  const needsPositioning = overlay !== 'none';

  const wrapperClasses = [
    styles.wrapper,
    needsPositioning
      ? (coverage === 'fullscreen' ? styles.coverageFullscreen : styles.coverageComponent)
      : '',
    overlayMap[overlay] || styles.overlayTransparent,
    state === 'completed' ? styles.hidden : '',
    className,
  ].filter(Boolean).join(' ');

  const spinnerClasses = [
    styles.spinner,
    sizeMap[size] || styles.sizeMd,
  ].filter(Boolean).join(' ');

  const labelClasses = [
    styles.label,
    overlay === 'dark' ? styles.labelDark : '',
  ].filter(Boolean).join(' ');

  if (state === 'completed') return null;

  return (
    <div className={wrapperClasses} data-testid="loading-overlay">
      <div className={spinnerClasses} data-testid="loading-spinner" />
      {label && <span className={labelClasses} data-testid="loading-label">{label}</span>}
    </div>
  );
}
