import { useState, useRef } from 'react';
import type { FloatingMenuProps, FloatingMenuItem, InternalFloatingMenuController } from '../../shared/types';
import { getItemStyles, getSelectionStyleObj, useControllerSubscription, getGapStyle } from '../../shared/utils';
import { BottomSheetWrapperMobileView } from '../../../wrappers/BottomSheetWrapper/mobile';
import styles from '../styles/FloatingMenu.mobile.module.css';

export const FloatingMenuMobileView = <T,>(props: FloatingMenuProps<T>) => {
  const {
    items,
    header,
    footer,
    itemConfig,
    scroll = 'auto',
    isOpen = true,
    selectable = false,
    defaultSelectedId,
    selectionStyle,
    onSelectionChange,
    onItemClick,
    onClose,
    controller,
    className = '',
    itemClassName = '',
    headerClassName = '',
    footerClassName = '',
    selectedClassName = '',
    bodyClassName = '',
  } = props;

  const internalController = controller as InternalFloatingMenuController | undefined;

  const defaultIdRef = useRef(defaultSelectedId);

  if (selectable && internalController && defaultIdRef.current && internalController._getSelectedId() === null) {
    internalController._setSelectedId(defaultIdRef.current);
  }

  const [localSelectedId, setLocalSelectedId] = useState<string | null>(
    selectable && defaultSelectedId ? defaultSelectedId : null
  );

  const controllerSelectedId = useControllerSubscription(
    selectable ? internalController : undefined
  );

  const currentSelectedId = selectable
    ? (internalController ? controllerSelectedId : localSelectedId)
    : null;

  const handleItemClick = (item: FloatingMenuItem<T>, index: number) => {
    if (item.disabled) return;

    if (selectable) {
      const newSelectedId = item.id;
      if (internalController) {
        internalController._setSelectedId(newSelectedId);
      } else {
        setLocalSelectedId(newSelectedId);
      }
      const selectedItem = items.find((i) => i.id === newSelectedId) || null;
      onSelectionChange?.(newSelectedId, selectedItem);
    }

    onItemClick?.(item, index);
  };

  const showHeader = header?.show !== false && header?.renderType === 'component' && header?.render;
  const showFooter = footer?.show !== false && footer?.renderType === 'component' && footer?.render;

  const itemStyles = getItemStyles(itemConfig);
  const scrollClass = scroll === 'auto' ? styles.scrollAuto : styles.scrollNone;
  const selectedStyleObj = getSelectionStyleObj(selectionStyle);

  const headerContent = showHeader ? (
    <div className={headerClassName} data-testid="floatingmenu-mobile-header">
      {header.render!()}
    </div>
  ) : undefined;

  const footerContent = showFooter ? (
    <div className={footerClassName} data-testid="floatingmenu-mobile-footer">
      {footer.render!()}
    </div>
  ) : undefined;

  return (
    <BottomSheetWrapperMobileView
      isOpen={isOpen}
      onClose={() => onClose?.()}
      header={headerContent}
      footer={footerContent}
      showCloseButton={false}
      showDragHandle={true}
      heightMode="auto"
      className={className}
      contentClassName={`${scrollClass} ${bodyClassName}`}
      dataTestId="floatingmenu-mobile"
    >
      <div className={styles.itemsContainer} style={getGapStyle(itemConfig?.gap)}>
        {items.map((item, index) => {
          const isSelected = selectable && currentSelectedId === item.id;

          return (
            <div
              key={item.id}
              className={`${styles.menuItem} ${item.disabled ? styles.disabled : ''} ${isSelected ? `${styles.selected} ${selectedClassName}` : ''} ${itemClassName}`}
              style={{
                ...itemStyles,
                ...(isSelected ? selectedStyleObj : {}),
              }}
              onClick={() => handleItemClick(item, index)}
              data-testid={`floatingmenu-mobile-item-${item.id}`}
              data-selected={isSelected || undefined}
            >
              {item.render(item)}
            </div>
          );
        })}
      </div>
    </BottomSheetWrapperMobileView>
  );
};
