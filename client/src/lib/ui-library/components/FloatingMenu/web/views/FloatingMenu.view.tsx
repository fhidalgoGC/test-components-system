import { useState, useRef, useCallback, useEffect, useSyncExternalStore } from 'react';
import type { FloatingMenuProps, FloatingMenuItem, FloatingMenuLayout, FloatingMenuItemConfig, FloatingMenuSectionConfig, FloatingMenuSelectionStyle, MenuPosition } from '../types';
import type { InternalFloatingMenuController } from '../hooks/useFloatingMenu.hook';
import styles from '../css/FloatingMenu.module.css';

const getLayoutStyles = (layout?: FloatingMenuLayout): React.CSSProperties => {
  if (!layout) return {};
  
  const style: React.CSSProperties = {};
  
  if (layout.widthMode === 'full') {
    style.width = '100%';
  } else if (layout.widthMode === 'fixed' && layout.width) {
    style.width = typeof layout.width === 'number' ? `${layout.width}px` : layout.width;
  } else if (layout.widthMode === 'auto') {
    style.width = 'auto';
  }
  
  if (layout.minWidth) {
    style.minWidth = typeof layout.minWidth === 'number' ? `${layout.minWidth}px` : layout.minWidth;
  }
  if (layout.maxWidth) {
    style.maxWidth = typeof layout.maxWidth === 'number' ? `${layout.maxWidth}px` : layout.maxWidth;
  }
  
  if (layout.heightMode === 'full') {
    style.height = '100%';
  } else if (layout.heightMode === 'fixed' && layout.height) {
    style.height = typeof layout.height === 'number' ? `${layout.height}px` : layout.height;
  } else if (layout.heightMode === 'auto') {
    style.height = 'auto';
  }
  
  if (layout.minHeight) {
    style.minHeight = typeof layout.minHeight === 'number' ? `${layout.minHeight}px` : layout.minHeight;
  }
  if (layout.maxHeight) {
    style.maxHeight = typeof layout.maxHeight === 'number' ? `${layout.maxHeight}px` : layout.maxHeight;
  }
  
  return style;
};

const getPositionStyles = (position: MenuPosition, offset: number): React.CSSProperties => {
  const style: React.CSSProperties = {};
  const offsetPx = `${offset}px`;
  
  switch (position) {
    case 'top':
      style.bottom = `calc(100% + ${offsetPx})`;
      style.left = '50%';
      style.transform = 'translateX(-50%)';
      break;
    case 'top-start':
      style.bottom = `calc(100% + ${offsetPx})`;
      style.left = '0';
      break;
    case 'top-end':
      style.bottom = `calc(100% + ${offsetPx})`;
      style.right = '0';
      break;
    case 'bottom':
      style.top = `calc(100% + ${offsetPx})`;
      style.left = '50%';
      style.transform = 'translateX(-50%)';
      break;
    case 'bottom-start':
      style.top = `calc(100% + ${offsetPx})`;
      style.left = '0';
      break;
    case 'bottom-end':
      style.top = `calc(100% + ${offsetPx})`;
      style.right = '0';
      break;
    case 'left':
      style.right = `calc(100% + ${offsetPx})`;
      style.top = '50%';
      style.transform = 'translateY(-50%)';
      break;
    case 'left-start':
      style.right = `calc(100% + ${offsetPx})`;
      style.top = '0';
      break;
    case 'left-end':
      style.right = `calc(100% + ${offsetPx})`;
      style.bottom = '0';
      break;
    case 'right':
      style.left = `calc(100% + ${offsetPx})`;
      style.top = '50%';
      style.transform = 'translateY(-50%)';
      break;
    case 'right-start':
      style.left = `calc(100% + ${offsetPx})`;
      style.top = '0';
      break;
    case 'right-end':
      style.left = `calc(100% + ${offsetPx})`;
      style.bottom = '0';
      break;
  }
  
  return style;
};

const getSectionStyles = (config?: FloatingMenuSectionConfig): React.CSSProperties => {
  if (!config) return {};
  
  const style: React.CSSProperties = {};
  
  if (config.heightMode === 'full') {
    style.height = '100%';
  } else if (config.heightMode === 'fixed' && config.height) {
    style.height = typeof config.height === 'number' ? `${config.height}px` : config.height;
  } else if (config.heightMode === 'auto') {
    style.height = 'auto';
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
  
  if (itemConfig.heightMode === 'full') {
    style.height = '100%';
  } else if (itemConfig.heightMode === 'fixed' && itemConfig.height) {
    style.height = typeof itemConfig.height === 'number' ? `${itemConfig.height}px` : itemConfig.height;
  } else if (itemConfig.heightMode === 'auto') {
    style.height = 'auto';
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

function DragHandle({ className }: { className?: string }) {
  return (
    <div
      className={`${styles.dragHandle} ${className || ''}`}
      data-testid="floatingmenu-drag-handle"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <circle cx="5" cy="3" r="1.5" />
        <circle cx="11" cy="3" r="1.5" />
        <circle cx="5" cy="8" r="1.5" />
        <circle cx="11" cy="8" r="1.5" />
        <circle cx="5" cy="13" r="1.5" />
        <circle cx="11" cy="13" r="1.5" />
      </svg>
    </div>
  );
}

export const FloatingMenuView = <T,>(props: FloatingMenuProps<T>) => {
  const { 
    items, 
    layout,
    position = 'bottom-start',
    offset = 0,
    header,
    footer,
    itemConfig,
    scroll = 'auto',
    isOpen = true,
    showBackdrop = true,
    selectable = false,
    defaultSelectedId,
    selectionStyle,
    orderable = false,
    onOrderChange,
    onSelectionChange,
    onItemClick,
    onClose,
    controller,
    className = '',
    itemClassName = '',
    headerClassName = '',
    footerClassName = '',
    selectedClassName = '',
    dragHandleClassName = '',
    bodyClassName = ''
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

  const [orderedItems, setOrderedItems] = useState<FloatingMenuItem<T>[] | null>(null);
  const dragItemIdRef = useRef<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const displayItems = orderable && orderedItems ? orderedItems : items;

  useEffect(() => {
    if (orderable) {
      setOrderedItems(null);
    }
  }, [items, orderable]);

  const handleDragStart = useCallback((itemId: string, e: React.DragEvent) => {
    dragItemIdRef.current = itemId;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', itemId);
    const target = e.currentTarget as HTMLElement;
    requestAnimationFrame(() => {
      target.classList.add(styles.dragging);
    });
  }, []);

  const handleDragOver = useCallback((index: number, e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback((dropIndex: number, e: React.DragEvent) => {
    e.preventDefault();
    const draggedId = dragItemIdRef.current;
    if (draggedId === null) {
      setDragOverIndex(null);
      return;
    }

    const currentItems = orderedItems ? [...orderedItems] : [...items];
    const fromIndex = currentItems.findIndex((i) => i.id === draggedId);
    if (fromIndex === -1 || fromIndex === dropIndex) {
      setDragOverIndex(null);
      dragItemIdRef.current = null;
      return;
    }

    const [movedItem] = currentItems.splice(fromIndex, 1);
    currentItems.splice(dropIndex, 0, movedItem);

    setOrderedItems(currentItems);
    setDragOverIndex(null);
    dragItemIdRef.current = null;
    onOrderChange?.(currentItems);
  }, [items, orderedItems, onOrderChange]);

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.classList.remove(styles.dragging);
    setDragOverIndex(null);
    dragItemIdRef.current = null;
  }, []);

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
  const positionStyles = getPositionStyles(position, offset);
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
          data-testid="floatingmenu-backdrop"
        />
      )}
      <div 
        className={`${styles.floatingMenu} ${className}`}
        style={{ ...layoutStyles, ...positionStyles }}
        data-testid="floatingmenu"
      >
        {showHeader && (
          <div 
            className={`${styles.header} ${headerClassName}`}
            style={headerStyles}
            data-testid="floatingmenu-header"
          >
            {header.render!()}
          </div>
        )}
        
        <div className={`${styles.body} ${scrollClass} ${bodyClassName}`} data-testid="floatingmenu-body">
          <div className={styles.itemsContainer} style={itemConfig?.gap != null ? { gap: typeof itemConfig.gap === 'number' ? `${itemConfig.gap}px` : itemConfig.gap } : undefined}>
            {displayItems.map((item, index) => {
              const isSelected = selectable && currentSelectedId === item.id;
              const isDragOver = orderable && dragOverIndex === index;

              const itemEl = (
                <div
                  key={item.id}
                  className={`${orderable ? styles.orderableItem : styles.menuItem} ${item.disabled ? styles.disabled : ''} ${isSelected ? `${styles.selected} ${selectedClassName}` : ''} ${isDragOver ? styles.dragOver : ''} ${itemClassName}`}
                  style={{
                    ...itemStyles,
                    ...(isSelected ? selectedStyleObj : {}),
                  }}
                  onClick={() => handleItemClick(item, index)}
                  data-testid={`floatingmenu-item-${item.id}`}
                  data-selected={isSelected || undefined}
                  draggable={orderable}
                  onDragStart={orderable ? (e) => handleDragStart(item.id, e) : undefined}
                  onDragOver={orderable ? (e) => handleDragOver(index, e) : undefined}
                  onDragLeave={orderable ? handleDragLeave : undefined}
                  onDrop={orderable ? (e) => handleDrop(index, e) : undefined}
                  onDragEnd={orderable ? handleDragEnd : undefined}
                >
                  <div className={orderable ? styles.orderableContent : undefined}>
                    {item.render(item)}
                  </div>
                  {orderable && <DragHandle className={dragHandleClassName} />}
                </div>
              );

              return itemEl;
            })}
          </div>
        </div>
        
        {showFooter && (
          <div 
            className={`${styles.footer} ${footerClassName}`}
            style={footerStyles}
            data-testid="floatingmenu-footer"
          >
            {footer.render!()}
          </div>
        )}
      </div>
    </>
  );
};
