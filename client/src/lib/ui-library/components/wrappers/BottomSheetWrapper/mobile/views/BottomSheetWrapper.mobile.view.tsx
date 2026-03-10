import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties } from 'react';
import { X } from 'lucide-react';
import type { BottomSheetWrapperProps, BottomSheetHeightMode } from '../types';
import styles from '../css/BottomSheetWrapper.mobile.module.css';

const heightClassMap: Record<Exclude<BottomSheetHeightMode, 'custom'>, string> = {
  auto: styles.sheetAuto,
  full: styles.sheetFull,
  half: styles.sheetHalf,
};

export function BottomSheetWrapperMobileView({
  isOpen,
  onClose,
  title,
  subtitle,
  header,
  children,
  footer,
  showCloseButton = true,
  showDragHandle = true,
  heightMode = 'auto',
  customHeight,
  closeOnOverlayClick = true,
  overlayOpacity = 0.4,
  className = '',
  contentClassName = '',
  dataTestId = 'bottom-sheet',
}: BottomSheetWrapperProps) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOverlayClick = useCallback(() => {
    if (closeOnOverlayClick) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  if (!isOpen) return null;

  const hasHeader = !!(title || header || showCloseButton);

  const sheetHeightClass = heightMode === 'custom' ? '' : (heightClassMap[heightMode] || heightClassMap.auto);

  const sheetStyle: CSSProperties = {};
  if (heightMode === 'custom' && customHeight) {
    sheetStyle.height = customHeight;
  }

  const content = (
    <div
      className={styles.overlay}
      data-testid={dataTestId}
    >
      <div
        className={styles.backdrop}
        style={{ opacity: overlayOpacity }}
        onClick={handleOverlayClick}
        data-testid={`${dataTestId}-overlay`}
      />

      <div
        className={`${styles.sheet} ${sheetHeightClass} ${className}`}
        style={sheetStyle}
      >
        {showDragHandle && (
          <div className={styles.dragHandle} data-testid={`${dataTestId}-drag-handle`}>
            <div className={styles.dragHandleBar} />
          </div>
        )}

        {hasHeader && (
          <div className={styles.header}>
            {header ? (
              <div className={styles.headerContent}>{header}</div>
            ) : (
              <div className={styles.headerContent}>
                {title && (
                  <h2
                    className={styles.title}
                    data-testid={`${dataTestId}-title`}
                  >
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className={styles.subtitle}>{subtitle}</p>
                )}
              </div>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                data-testid={`${dataTestId}-close`}
                className={styles.closeButton}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        <div className={`${styles.body} ${contentClassName}`}>
          {children}
        </div>

        {footer && (
          <div className={styles.footer} data-testid={`${dataTestId}-footer`}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
