import type { LayoutRowProps } from '../types';
import { useLayoutRowContext } from '../providers';

export const LayoutRowView = (props: LayoutRowProps) => {
  const { children, className } = props;
  const { t } = useLayoutRowContext();

  return (
    <div className={className} data-testid="layoutrow">
      <div>
        <strong>{t('label')}</strong>
        <p>{t('description')}</p>
      </div>
      {children}
    </div>
  );
};
