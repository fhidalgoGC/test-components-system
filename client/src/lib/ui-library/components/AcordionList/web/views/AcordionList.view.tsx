import type { AcordionListProps } from '../types';
import { useAcordionListContext } from '../providers';

export const AcordionListView = (props: AcordionListProps) => {
  const { children, className } = props;
  const { t } = useAcordionListContext();

  return (
    <div className={className} data-testid="acordionlist">
      <div>
        <strong>{t('label')}</strong>
        <p>{t('description')}</p>
      </div>
      {children}
    </div>
  );
};
