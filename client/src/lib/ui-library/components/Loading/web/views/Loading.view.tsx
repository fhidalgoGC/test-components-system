import type { LoadingProps } from '../types/Loading.type';
import { SelfSpinner } from '../../components/self';
import styles from '../css/Loading.module.css';

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
  renderType = 'self',
  render,
  labelI18n,
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

  if (state === 'completed') return null;

  const renderContent = () => {
    if (renderType === 'component' && render) {
      return render;
    }
    return <SelfSpinner size={size} labelI18n={labelI18n} overlay={overlay} />;
  };

  return (
    <div className={wrapperClasses} data-testid="loading-overlay">
      {renderContent()}
    </div>
  );
}
