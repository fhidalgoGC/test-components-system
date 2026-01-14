import { ChevronDown, ChevronUp } from 'lucide-react';
import { GCExpansionPanelHeaderProps } from './GCExpansionPanelProps';

const GCExpansionPanelHeader = ({
  expanded,
  disabled,
  hideToggle,
  onClick,
  title,
  description,
  children,
  className = '',
  'data-testid': dataTestId = 'gc-expansion-panel-header'
}: GCExpansionPanelHeaderProps) => {
  
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const headerClasses = [
    'gc-expansion-panel__header',
    disabled && 'gc-expansion-panel__header--disabled',
    className
  ].filter(Boolean).join(' ');

  const titleClasses = [
    'gc-expansion-panel__title'
  ].filter(Boolean).join(' ');

  const descriptionClasses = [
    'gc-expansion-panel__description'
  ].filter(Boolean).join(' ');

  const toggleClasses = [
    'gc-expansion-panel__toggle-icon',
    expanded && 'gc-expansion-panel__toggle-icon--expanded'
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={headerClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      data-testid={dataTestId}
      role="button"
      aria-expanded={expanded}
      aria-disabled={disabled}
    >
      <div className="gc-expansion-panel__header-content">
        {(title || description) ? (
          <div className="gc-expansion-panel__text-content">
            {title && (
              <div className={titleClasses}>
                {title}
              </div>
            )}
            {description && (
              <div className={descriptionClasses}>
                {description}
              </div>
            )}
          </div>
        ) : (
          children && (
            <div className="gc-expansion-panel__custom-content">
              {children}
            </div>
          )
        )}
      </div>
      
      {!hideToggle && (
        <div className="gc-expansion-panel__toggle">
          {expanded ? (
            <ChevronUp 
              className={toggleClasses}
              size={20}
              data-testid={`${dataTestId}-chevron-up`}
            />
          ) : (
            <ChevronDown 
              className={toggleClasses}
              size={20}
              data-testid={`${dataTestId}-chevron-down`}
            />
          )}
        </div>
      )}
    </button>
  );
};

export default GCExpansionPanelHeader;