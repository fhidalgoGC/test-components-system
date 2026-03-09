import { useState, useRef, useSyncExternalStore } from 'react';
import type { FloatingMenuMobileProps } from '../types/FloatingMenu.mobile.types';
import type { FloatingMenuItem, FloatingMenuLayout, FloatingMenuItemConfig, FloatingMenuSectionConfig, FloatingMenuSelectionStyle } from '../../web/types';
import type { InternalFloatingMenuController } from '../../web/hooks/useFloatingMenu.hook';
import styles from '../css/FloatingMenu.mobile.module.css';

const getLayoutStyles = (layout?: FloatingMenuLayout): React.CSSProperties => {
  if (!layout) return {};
  const style: React.CSSProperties = {};
  if (layout.heightMode === 'fixed' && layout.height) {
    style.height = typeof layout.height === 'number' ? `${layout.height}px` : layout.height;
  }
  if (layout.minHeight) {
    style.minHeight = typeof layout.minHeight === 'number' ? `${layout.minHeight}px` : layout.minHeight;
  }
  if (layout.maxHeight) {
    style.maxHeight = typeof layout.maxHeight === 'number' ? `${layout.maxHeight}px` : layout.maxHeight;
  }
  return style;
};

const getSectionStyles = (config?: FloatingMenuSectionConfig): React.CSSProperties => {
  if (!config) return {};
  const style: React.CSSProperties = {};
  if (config.heightMode === 'fixed' && config.height) {
    style.height = typeof config.height === 'number' ? `${config.height}px` : config.height;
  }
  if (config.minHeight) {
    style.minHeight = typeof config.minHeight === 'number' ? `${config.minHeight}px` : config.minHeight;
  }
  if (config.maxHeight) {
    style.maxHeight = typeof config.maxHeight === 'number' ? `${config.maxHeight}px` : config.maxHeight;
  }
  return style;
};

const getItemStyles = (itemConfig?: FloatingMenuItemConfig): React.CSSProperties => {
  if (!itemConfig) return {};
  const style: React.CSSProperties = {};
  if (itemConfig.heightMode === 'fixed' && itemConfig.height) {
    style.height = typeof itemConfig.height === 'number' ? `${itemConfig.height}px` : itemConfig.height;
  }
  if (itemConfig.minHeight) {
    style.minHeight = typeof itemConfig.minHeight === 'number' ? `${itemConfig.minHeight}px` : itemConfig.minHeight;
  }
  return style;
};

const getSelectionStyleObj = (selectionStyle?: FloatingMenuSelectionStyle): React.CSSProperties => {
  if (!selectionStyle) return {};
  const style: React.CSSProperties = {};
  if (selectionStyle.border) style.border = selectionStyle.border;
  if (selectionStyle.borderRadius) style.borderRadius = selectionStyle.borderRadius;
  if (selectionStyle.backgroundColor) style.backgroundColor = selectionStyle.backgroundColor;
  if (selectionStyle.boxShadow) style.boxShadow = selectionStyle.boxShadow;
  if (selectionStyle.outline) style.outline = selectionStyle.outline;
  if (selectionStyle.custom) Object.assign(style, selectionStyle.custom);
  return style;
};

const useControllerSubscription = (controller?: InternalFloatingMenuController) => {
  const selectedId = useSyncExternalStore(
    (callback) => {
      if (!controller?._subscribe) return () => {};
      return controller._subscribe(callback);
    },
    () => controller?._getSelectedId?.() ?? null
  );
  return selectedId;
};

export const FloatingMenuMobileView = <T,>(props: FloatingMenuMobileProps<T>) => {
  const {
    items,
    layout,
    header,
    footer,
    itemConfig,
    scroll = 'auto',
    isOpen = true,
    showBackdrop = true,
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

  const handleBackdropClick = () => {
    onClose?.();
  };

  if (!isOpen) return null;

  const layoutStyles = getLayoutStyles(layout);
  const itemStyles = getItemStyles(itemConfig);
  const scrollClass = scroll === 'auto' ? styles.scrollAuto : styles.scrollNone;
  const selectedStyleObj = getSelectionStyleObj(selectionStyle);

  const showHeader = header?.show !== false && header?.renderType === 'component' && header?.render;
  const showFooter = footer?.show !== false && footer?.renderType === 'component' && footer?.render;

  const headerStyles = getSectionStyles(header);
  const footerStyles = getSectionStyles(footer);

  return (
    <>
      {showBackdrop && (
        <div
          className={styles.backdrop}
          onClick={handleBackdropClick}
          data-testid="floatingmenu-mobile-backdrop"
        />
      )}
      <div
        className={`${styles.bottomSheet} ${className}`}
        style={layoutStyles}
        data-testid="floatingmenu-mobile"
      >
        <div className={styles.handle}>
          <div className={styles.handleBar} />
        </div>

        {showHeader && (
          <div
            className={`${styles.header} ${headerClassName}`}
            style={headerStyles}
            data-testid="floatingmenu-mobile-header"
          >
            {header.render!()}
          </div>
        )}

        <div className={`${styles.body} ${scrollClass} ${bodyClassName}`} data-testid="floatingmenu-mobile-body">
          <div className={styles.itemsContainer} style={itemConfig?.gap != null ? { gap: typeof itemConfig.gap === 'number' ? `${itemConfig.gap}px` : itemConfig.gap } : undefined}>
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
        </div>

        {showFooter && (
          <div
            className={`${styles.footer} ${footerClassName}`}
            style={footerStyles}
            data-testid="floatingmenu-mobile-footer"
          >
            {footer.render!()}
          </div>
        )}
      </div>
    </>
  );
};
