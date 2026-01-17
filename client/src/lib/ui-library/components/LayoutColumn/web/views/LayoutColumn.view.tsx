import type { LayoutColumnProps } from '../types';
import { useLayoutColumnContext } from '../providers';

export const LayoutColumnView = (props: LayoutColumnProps) => {
  const { children, className } = props;
  const { t } = useLayoutColumnContext();

  return (
    <div className={className} data-testid="layoutcolumn">
      <div>
        <strong>{t('label')}</strong>
        <p>{t('description')}</p>
      </div>
      {children}
    </div>
  );
};
