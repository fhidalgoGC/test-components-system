import { useContext } from 'react';
import type { LoadingSize, LoadingOverlay } from '../../web/types/Loading.type';
import type { LabelOrMultiLanguage } from '../../../../types/language.types';
import { resolveMultiLanguageLabel } from '../../../../utils/i18n.util';
import { LibI18nContext } from '../../../../providers/AppLanguageLibUiProvider/index.hook';
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
  labelI18n?: LabelOrMultiLanguage;
  overlay?: LoadingOverlay;
}

export function SelfSpinner({ size = 'md', labelI18n, overlay }: SelfSpinnerProps) {
  const libI18n = useContext(LibI18nContext);
  const lang = libI18n?.lang || 'en';

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
