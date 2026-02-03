import { isValidElement } from 'react';
import type { AccordionProps } from '../../shared';
import { useAccordion } from '../hooks';
import { accordionStyles } from '../css';

function renderContent(content: AccordionProps['header']['render']): JSX.Element {
  if (isValidElement(content)) {
    return content;
  }
  if (typeof content === 'function') {
    const Component = content;
    return <Component />;
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

function getHeaderStyles(header: AccordionProps['header']) {
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

function getBodyStyles(body: AccordionProps['body']) {
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

export const AccordionView = (props: AccordionProps) => {
  const { id, layout, header, body } = props;
  
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
    controller: props.controller,
    callbacks: props.callbacks,
    body: props.body,
  });

  const layoutStyles = getLayoutStyles(layout);
  const headerStyles = getHeaderStyles(header);
  const bodyStyles = getBodyStyles(body);

  return (
    <div 
      className={accordionStyles.accordion}
      style={layoutStyles}
      data-testid={`accordion-${id}`}
      data-open={isOpen}
    >
      <div 
        className={accordionStyles.header}
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
        {renderContent(header.render)}
      </div>
      
      {shouldRenderBody && (
        <div 
          className={accordionStyles.body}
          style={{
            ...bodyStyles,
            display: shouldShowBody ? 'block' : 'none',
          }}
          key={renderKey}
          data-testid={`accordion-body-${id}`}
        >
          {renderContent(body.render)}
        </div>
      )}
    </div>
  );
};
