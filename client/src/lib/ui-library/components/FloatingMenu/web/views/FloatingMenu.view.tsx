import type { FloatingMenuProps, FloatingMenuItem, FloatingMenuLayout, FloatingMenuItemConfig } from '../types';
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

export const FloatingMenuView = <T,>(props: FloatingMenuProps<T>) => {
  const { 
    items, 
    layout, 
    itemConfig,
    scroll = 'auto',
    isOpen = true,
    showBackdrop = true,
    onItemClick,
    onClose,
    className = '',
    itemClassName = ''
  } = props;

  if (!isOpen) return null;

  const handleItemClick = (item: FloatingMenuItem<T>, index: number) => {
    if (item.disabled) return;
    onItemClick?.(item, index);
  };

  const handleBackdropClick = () => {
    onClose?.();
  };

  const layoutStyles = getLayoutStyles(layout);
  const itemStyles = getItemStyles(itemConfig);
  const scrollClass = scroll === 'auto' ? styles.scrollAuto : styles.scrollNone;

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
        className={`${styles.floatingMenu} ${scrollClass} ${className}`}
        style={layoutStyles}
        data-testid="floatingmenu"
      >
        <div className={styles.itemsContainer}>
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.menuItem} ${item.disabled ? styles.disabled : ''} ${itemClassName}`}
              style={itemStyles}
              onClick={() => handleItemClick(item, index)}
              data-testid={`floatingmenu-item-${item.id}`}
            >
              {item.render(item)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
