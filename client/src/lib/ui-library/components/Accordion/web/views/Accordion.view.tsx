import { isValidElement } from 'react';
import type { AccordionProps, InternalAccordionController } from '../../shared';
import { useAccordion } from '../hooks';
import styles from '../css/Accordion.module.css';

function renderContent<T>(content: AccordionProps<T>['header']['render'], itemData?: T): JSX.Element {
  if (isValidElement(content)) {
    return content;
  }
  if (typeof content === 'function') {
    const Component = content;
    return itemData !== undefined ? <Component itemData={itemData} /> : <Component itemData={undefined as T} />;
  }
  return <>{content}</>;
}

function getLayoutStyles(layout: AccordionProps['layout']) {
  const style: React.CSSProperties = {};
  
  if (!layout) return style;

  if (layout.widthMode === 'full') {
    style.width = '100%';
  } else if (layout.widthMode === 'fixed' && layout.width) {
    style.width = layout.width;
  }
  
  if (layout.minWidth) {
    style.minWidth = layout.minWidth;
  }

  if (layout.heightMode === 'full') {
    style.height = '100%';
  } else if (layout.heightMode === 'fixed' && layout.height) {
    style.height = layout.height;
  }
  
  if (layout.minHeight) {
    style.minHeight = layout.minHeight;
  }

  return style;
}

function getHeaderStyles<T>(header: AccordionProps<T>['header']) {
  const style: React.CSSProperties = {};

  if (header.heightMode === 'full') {
    style.height = '100%';
  } else if (header.heightMode === 'fixed' && header.height) {
    style.height = header.height;
  }
  
  if (header.minHeight) {
    style.minHeight = header.minHeight;
  }

  return style;
}

function getBodyStyles<T>(body: AccordionProps<T>['body']) {
  const style: React.CSSProperties = {};

  if (body.heightMode === 'full') {
    style.height = '100%';
  } else if (body.heightMode === 'fixed' && body.height) {
    style.height = body.height;
  }
  
  if (body.minHeight) {
    style.minHeight = body.minHeight;
  }

  if (body.behaviors?.scroll) {
    style.overflow = 'auto';
  }

  return style;
}

function ChevronIcon() {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export const AccordionView = <T = unknown,>(props: AccordionProps<T>) => {
  const { id, itemData, layout, header, body } = props;
  const arrowPosition = header.arrowPosition ?? 'none';
  
  const {
    isOpen,
    toggle,
    renderKey,
    shouldRenderBody,
    shouldShowBody,
  } = useAccordion({
    id: props.id,
    isOpen: props.isOpen,
    defaultOpen: props.defaultOpen,
    controller: props.controller as InternalAccordionController | undefined,
    callbacks: props.callbacks,
    body: props.body,
  });

  const layoutStyles = getLayoutStyles(layout);
  const headerStyles = getHeaderStyles(header);
  const bodyStyles = getBodyStyles(body);

  const renderHeaderContent = () => {
    if (arrowPosition === 'none') {
      return renderContent(header.render, itemData);
    }

    const arrowClasses = `${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`;
    const contentClasses = `${styles.headerContent} ${
      arrowPosition === 'left' ? styles.headerContentLeft : styles.headerContentRight
    }`;

    return (
      <div className={contentClasses}>
        <span className={arrowClasses}>
          <ChevronIcon />
        </span>
        <div className={styles.headerContentInner}>
          {renderContent(header.render, itemData)}
        </div>
      </div>
    );
  };

  return (
    <div 
      className={styles.accordion}
      style={layoutStyles}
      data-testid={`accordion-${id}`}
      data-open={isOpen}
    >
      <div 
        className={styles.header}
        style={headerStyles}
        onClick={toggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
        aria-expanded={isOpen}
        data-testid={`accordion-header-${id}`}
      >
        {renderHeaderContent()}
      </div>
      
      {shouldRenderBody && (
        <div 
          className={styles.body}
          style={{
            ...bodyStyles,
            display: shouldShowBody ? 'block' : 'none',
          }}
          key={renderKey}
          data-testid={`accordion-body-${id}`}
        >
          {renderContent(body.render, itemData)}
        </div>
      )}
    </div>
  );
};
