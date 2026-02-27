import type { SelfSpinnerProps } from '../types';
import { useSelfSpinnerContext } from '../providers';
import { resolveMultiLanguageLabel } from '../../../../../utils/i18n.util';
import styles from '../css/SelfSpinner.module.css';

const sizeMap: Record<string, string> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
};

export function SelfSpinnerView({ size = 'md', labelI18n, overlay }: SelfSpinnerProps) {
  const { lang } = useSelfSpinnerContext();

  const spinnerClasses = [
    styles.spinner,
    sizeMap[size] || styles.sizeMd,
  ].filter(Boolean).join(' ');

  const labelClasses = [
    styles.label,
    overlay === 'dark' ? styles.labelDark : '',
  ].filter(Boolean).join(' ');

  const resolvedLabel = labelI18n ? resolveMultiLanguageLabel(labelI18n, lang) : undefined;

  return (
    <>
      <div className={spinnerClasses} data-testid="loading-spinner" />
      {resolvedLabel && <span className={labelClasses} data-testid="loading-label">{resolvedLabel}</span>}
    </>
  );
}
