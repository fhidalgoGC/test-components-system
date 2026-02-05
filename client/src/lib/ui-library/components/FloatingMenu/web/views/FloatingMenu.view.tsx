import type { FloatingMenuProps, FloatingMenuItem, FloatingMenuLayout, FloatingMenuItemConfig, FloatingMenuSectionConfig, MenuPosition } from '../types';
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

const getPositionStyles = (position: MenuPosition): React.CSSProperties => {
  const style: React.CSSProperties = {};
  
  switch (position) {
    case 'top':
      style.bottom = '100%';
      style.left = '50%';
      style.transform = 'translateX(-50%)';
      break;
    case 'top-start':
      style.bottom = '100%';
      style.left = '0';
      break;
    case 'top-end':
      style.bottom = '100%';
      style.right = '0';
      break;
    case 'bottom':
      style.top = '100%';
      style.left = '50%';
      style.transform = 'translateX(-50%)';
      break;
    case 'bottom-start':
      style.top = '100%';
      style.left = '0';
      break;
    case 'bottom-end':
      style.top = '100%';
      style.right = '0';
      break;
    case 'left':
      style.right = '100%';
      style.top = '50%';
      style.transform = 'translateY(-50%)';
      break;
    case 'left-start':
      style.right = '100%';
      style.top = '0';
      break;
    case 'left-end':
      style.right = '100%';
      style.bottom = '0';
      break;
    case 'right':
      style.left = '100%';
      style.top = '50%';
      style.transform = 'translateY(-50%)';
      break;
    case 'right-start':
      style.left = '100%';
      style.top = '0';
      break;
    case 'right-end':
      style.left = '100%';
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

export const FloatingMenuView = <T,>(props: FloatingMenuProps<T>) => {
  const { 
    items, 
    layout,
    position = 'bottom-start',
    header,
    footer,
    itemConfig,
    scroll = 'auto',
    isOpen = true,
    showBackdrop = true,
    onItemClick,
    onClose,
    className = '',
    itemClassName = '',
    headerClassName = '',
    footerClassName = ''
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
  const positionStyles = getPositionStyles(position);
  const itemStyles = getItemStyles(itemConfig);
  const scrollClass = scroll === 'auto' ? styles.scrollAuto : styles.scrollNone;
  
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
        
        <div className={`${styles.body} ${scrollClass}`} data-testid="floatingmenu-body">
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
