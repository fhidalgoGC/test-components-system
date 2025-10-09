import type { BottomNavigationBarProps } from '../types';
import { useBottomNavigationBarContext } from '../providers';
import { resolveMultiLanguageLabel } from '../../../../utils';
import { cn } from '../../../../utils';
import styles from '../css/BottomNavigationBar.module';

export const BottomNavigationBarView = (props: BottomNavigationBarProps) => {
  const { className } = props;
  const { items, selectedId, onItemClick, lang, disabledIds } = useBottomNavigationBarContext();

  if (!items || items.length === 0) {
    return <nav className={cn(styles.container, className)} data-testid="bottomnavigationbar" />;
  }

  return (
    <nav className={cn(styles.container, className)} data-testid="bottomnavigationbar">
      {items.map((item) => {
        const isSelected = selectedId === item.id;
        // Priority: disabledIds prop > item.metadata.isDisabled
        const isDisabled = disabledIds.includes(item.id) || item.metadata?.isDisabled || false;
        const icon = item.metadata?.icon;
        const dataTestId = item.metadata?.dataTestId || `nav-item-${item.id}`;
        const label = resolveMultiLanguageLabel(item.label, lang);

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onItemClick(item)}
            disabled={isDisabled}
            className={cn(
              styles.navItem,
              isSelected && styles.navItemSelected,
              isDisabled && styles.navItemDisabled
            )}
            data-testid={dataTestId}
            aria-current={isSelected ? 'page' : undefined}
            aria-disabled={isDisabled}
          >
            {icon && (
              <span className={styles.navIcon} data-testid={`${dataTestId}-icon`}>
                {icon}
              </span>
            )}
            <span className={styles.navLabel} data-testid={`${dataTestId}-label`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
