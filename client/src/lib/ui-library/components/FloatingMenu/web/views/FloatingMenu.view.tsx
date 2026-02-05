import type { FloatingMenuProps } from '../types';
import { useFloatingMenuContext } from '../providers';

export const FloatingMenuView = (props: FloatingMenuProps) => {
  const { children, className } = props;
  const { t } = useFloatingMenuContext();

  return (
    <div className={className} data-testid="floatingmenu">
      <div>
        <strong>{t('label')}</strong>
        <p>{t('description')}</p>
      </div>
      {children}
    </div>
  );
};
