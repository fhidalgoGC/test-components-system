import type { BottomNavigationBarProps } from '../types';
import { useBottomNavigationBarContext } from '../providers';
import { resolveMultiLanguageLabel } from '../../../../utils';
import { cn } from '../../../../utils';
import styles from '../css/BottomNavigationBar.module';

export const BottomNavigationBarView = (props: BottomNavigationBarProps) => {
  const { className } = props;
  const { items, selectedId, onItemClick, lang } = useBottomNavigationBarContext();

  if (!items || items.length === 0) {
    return <nav className={cn(styles.container, className)} data-testid="bottomnavigationbar" />;
  }

  return (
    <nav className={cn(styles.container, className)} data-testid="bottomnavigationbar">
      {items.map((item) => {
        const isSelected = selectedId === item.id;
        const isDisabled = item.isDisabled;
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
            data-testid={`nav-item-${item.id}`}
            aria-current={isSelected ? 'page' : undefined}
            aria-disabled={isDisabled}
          >
            {item.icon && (
              <span className={styles.navIcon} data-testid={`nav-icon-${item.id}`}>
                {item.icon}
              </span>
            )}
            <span className={styles.navLabel} data-testid={`nav-label-${item.id}`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
