import { useEffect } from 'react';
import type { ModalProps, SectionConfig, StateConfig, ModalState } from '../types';
import styles from '../css/Modal.module.css';
import { X } from 'lucide-react';

const getAlignClasses = (
  vertical?: string,
  horizontal?: string
): string => {
  const classes: string[] = ['flex', 'flex-col'];
  if (vertical === 'top') classes.push(styles.sectionAlignTop);
  else if (vertical === 'bottom') classes.push(styles.sectionAlignBottom);
  else classes.push(styles.sectionAlignMiddle);

  if (horizontal === 'left') classes.push(styles.sectionAlignLeft);
  else if (horizontal === 'right') classes.push(styles.sectionAlignRight);
  else classes.push(styles.sectionAlignCenter);

  return classes.join(' ');
};

const getSizeStyle = (
  widthMode?: string,
  width?: number,
  minWidth?: number,
  heightMode?: string,
  height?: number,
  minHeight?: number
): React.CSSProperties => {
  const style: React.CSSProperties = {};

  if (widthMode === 'full') style.width = '100%';
  else if (widthMode === 'fixed' && width) style.width = `${width}px`;

  if (heightMode === 'full') style.height = '100%';
  else if (heightMode === 'fixed' && height) style.height = `${height}px`;

  if (minWidth) style.minWidth = `${minWidth}px`;
  if (minHeight) style.minHeight = `${minHeight}px`;

  return style;
};

const getSectionStyle = (section: SectionConfig): React.CSSProperties => {
  const style: React.CSSProperties = {};

  if (section.heightMode === 'fixed' && section.height) {
    style.height = `${section.height}px`;
  } else if (section.heightMode === 'full') {
    style.flex = 1;
  }

  if (section.minHeight) style.minHeight = `${section.minHeight}px`;

  return style;
};

const renderSelfState = (state: ModalState): React.ReactNode => {
  switch (state) {
    case 'loading':
      return (
        <div className={styles.selfLoading} data-testid="modal-state-loading">
          <div className={styles.spinner} />
        </div>
      );
    case 'empty':
      return (
        <div className={styles.selfEmpty} data-testid="modal-state-empty">
          No data available
        </div>
      );
    case 'error':
      return (
        <div className={styles.selfError} data-testid="modal-state-error">
          An error occurred
        </div>
      );
    default:
      return null;
  }
};

export const ModalView = (props: ModalProps) => {
  const {
    isOpen,
    state = 'idle',
    overlay = { enabled: true, opacity: 0.5, color: 'rgba(0,0,0,0.5)' },
    closeButton = { visible: true, position: 'top-right' },
    layout = { widthMode: 'auto' },
    header,
    body,
    footer,
    statesComponents,
    callbacks,
    className = '',
  } = props;

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && callbacks?.onClose) {
        callbacks.onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, callbacks]);

  if (!isOpen) return null;

  const modalStyle = getSizeStyle(
    undefined,
    undefined,
    undefined,
    layout.heightMode,
    layout.height,
    layout.minHeight
  );
  modalStyle.width = '100%';

  const handleOverlayClick = () => {
    if (overlay.closeOnClick && callbacks?.onClose) {
      callbacks.onClose();
    }
  };

  const overlayStyle: React.CSSProperties = {
    backgroundColor: overlay.enabled
      ? overlay.color || `rgba(0, 0, 0, ${overlay.opacity ?? 0.5})`
      : 'transparent',
    ...(overlay.blur ? { backdropFilter: 'blur(4px)' } : {}),
  };

  const currentStateConfig: StateConfig | undefined =
    statesComponents && state !== 'idle' && state !== 'success'
      ? statesComponents[state]
      : undefined;

  const showBody = state === 'idle' || state === 'success' || !currentStateConfig;

  const renderStateContent = () => {
    if (!currentStateConfig) return null;

    if (currentStateConfig.renderType === 'self') {
      return renderSelfState(state);
    }

    if (currentStateConfig.renderType === 'component' && currentStateConfig.render) {
      const stateStyle = getSizeStyle(
        currentStateConfig.widthMode,
        currentStateConfig.width,
        currentStateConfig.minWidth,
        currentStateConfig.heightMode,
        currentStateConfig.height,
        currentStateConfig.minHeight
      );
      const alignClass = getAlignClasses(
        currentStateConfig.verticalAlign,
        currentStateConfig.horizontalAlign
      );
      return (
        <div
          className={`${styles.stateContainer} ${alignClass}`}
          style={stateStyle}
          data-testid={`modal-state-${state}`}
        >
          {currentStateConfig.render}
        </div>
      );
    }

    return renderSelfState(state);
  };

  return (
    <div className={styles.overlay} data-testid="modal-overlay-container">
      <div
        className={styles.overlayBackground}
        style={overlayStyle}
        onClick={handleOverlayClick}
        data-testid="modal-overlay"
      />

      <div
        className={`${styles.modal} ${className}`}
        style={modalStyle}
        data-testid="modal"
        role="dialog"
        aria-modal="true"
      >
        {closeButton.visible && (
          closeButton.render ? (
            <div
              className={closeButton.position === 'top-left' ? styles.closeButtonTopLeft : styles.closeButtonTopRight}
              style={{ position: 'absolute', zIndex: 52 }}
              onClick={() => callbacks?.onClose?.()}
              data-testid="modal-close-button"
            >
              {closeButton.render}
            </div>
          ) : (
            <button
              className={`${styles.closeButton} ${
                closeButton.position === 'top-left'
                  ? styles.closeButtonTopLeft
                  : styles.closeButtonTopRight
              }`}
              onClick={() => callbacks?.onClose?.()}
              data-testid="modal-close-button"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          )
        )}

        {header && (
          <div
            className={`${styles.header} ${getAlignClasses(
              header.verticalAlign,
              header.horizontalAlign
            )}`}
            style={getSectionStyle(header)}
            data-testid="modal-header"
          >
            {header.render}
          </div>
        )}

        {showBody && body && (
          <div
            className={`${styles.body} ${getAlignClasses(
              body.verticalAlign,
              body.horizontalAlign
            )}`}
            style={getSectionStyle(body)}
            data-testid="modal-body"
          >
            {body.render}
          </div>
        )}

        {!showBody && renderStateContent()}

        {footer && (
          <div
            className={`${styles.footer} ${getAlignClasses(
              footer.verticalAlign,
              footer.horizontalAlign
            )}`}
            style={getSectionStyle(footer)}
            data-testid="modal-footer"
          >
            {footer.render}
          </div>
        )}
      </div>
    </div>
  );
};
