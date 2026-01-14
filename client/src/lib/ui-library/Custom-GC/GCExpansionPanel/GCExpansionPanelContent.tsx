import { useEffect, useRef, useState } from 'react';
import { GCExpansionPanelContentProps } from './GCExpansionPanelProps';

const GCExpansionPanelContent = ({
  expanded,
  lazy,
  children,
  className = '',
  'data-testid': dataTestId = 'gc-expansion-panel-content'
}: GCExpansionPanelContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasBeenExpanded, setHasBeenExpanded] = useState(!lazy || expanded);
  const [height, setHeight] = useState<number | string>(expanded ? 'auto' : 0);

  // Track if content has ever been expanded (for lazy loading)
  useEffect(() => {
    if (expanded && !hasBeenExpanded) {
      setHasBeenExpanded(true);
    }
  }, [expanded, hasBeenExpanded]);

  // Handle smooth height transitions
  useEffect(() => {
    if (contentRef.current) {
      if (expanded) {
        const scrollHeight = contentRef.current.scrollHeight;
        setHeight(scrollHeight);
        
        // Set to auto after animation completes
        const timer = setTimeout(() => {
          setHeight('auto');
        }, 300); // Animation duration
        
        return () => clearTimeout(timer);
      } else {
        // First set height to current scrollHeight, then to 0 for smooth animation
        const scrollHeight = contentRef.current.scrollHeight;
        setHeight(scrollHeight);
        
        // Use requestAnimationFrame to ensure the height change is applied
        requestAnimationFrame(() => {
          setHeight(0);
        });
      }
    }
  }, [expanded]);

  const contentClasses = [
    'gc-expansion-panel__content',
    expanded && 'gc-expansion-panel__content--expanded',
    className
  ].filter(Boolean).join(' ');

  const contentStyle: React.CSSProperties = {
    height: height,
    overflow: 'hidden',
    transition: 'height 300ms cubic-bezier(0.4, 0.0, 0.2, 1)'
  };

  // Don't render content if lazy loading and hasn't been expanded yet
  if (lazy && !hasBeenExpanded) {
    return (
      <div
        className={contentClasses}
        style={contentStyle}
        data-testid={dataTestId}
        aria-hidden={!expanded}
      />
    );
  }

  return (
    <div
      ref={contentRef}
      className={contentClasses}
      style={contentStyle}
      data-testid={dataTestId}
      aria-hidden={!expanded}
    >
      <div className="gc-expansion-panel__content-wrapper">
        {children}
      </div>
    </div>
  );
};

export default GCExpansionPanelContent;