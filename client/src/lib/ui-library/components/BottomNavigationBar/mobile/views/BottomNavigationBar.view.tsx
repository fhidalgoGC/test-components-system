import type { BottomNavigationBarProps } from '../types';
import { useBottomNavigationBarContext } from '../providers';

export const BottomNavigationBarView = (props: BottomNavigationBarProps) => {
  const { children, className } = props;
  const { t } = useBottomNavigationBarContext();

  return (
    <div className={className} data-testid="bottomnavigationbar">
      <div>
        <strong>{t('label')}</strong>
        <p>{t('description')}</p>
      </div>
      {children}
    </div>
  );
};
