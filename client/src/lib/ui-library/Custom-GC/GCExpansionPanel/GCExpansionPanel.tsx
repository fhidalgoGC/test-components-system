import { useState, useEffect } from 'react';
import {
  GCExpansionPanelProps,
  GCExpansionPanelState,
  GC_EXPANSION_PANEL_DEFAULT_EXPANDED,
  GC_EXPANSION_PANEL_DEFAULT_DISABLED,
  GC_EXPANSION_PANEL_DEFAULT_HIDE_TOGGLE,
  GC_EXPANSION_PANEL_DEFAULT_LAZY,
} from './GCExpansionPanelProps';
import GCExpansionPanelHeader from './GCExpansionPanelHeader';
import GCExpansionPanelContent from './GCExpansionPanelContent';
import './GCExpansionPanel.scss';

const GCExpansionPanel = ({
  expanded = GC_EXPANSION_PANEL_DEFAULT_EXPANDED,
  disabled = GC_EXPANSION_PANEL_DEFAULT_DISABLED,
  onToggle,
  hideToggle = GC_EXPANSION_PANEL_DEFAULT_HIDE_TOGGLE,
  lazy = GC_EXPANSION_PANEL_DEFAULT_LAZY,
  header,
  children,
  className = '',
  id,
  'data-testid': dataTestId = 'gc-expansion-panel'
}: GCExpansionPanelProps) => {
  const [state, setState] = useState<GCExpansionPanelState>({
    expanded: expanded,
    initialized: false
  });

  // Sync internal state with external expanded prop
  useEffect(() => {
    if (expanded !== state.expanded) {
      setState(prev => ({
        ...prev,
        expanded: expanded,
        initialized: true
      }));
    }
  }, [expanded, state.expanded]);

  const handleToggle = () => {
    if (disabled) return;

    const newExpanded = !state.expanded;
    setState(prev => ({
      ...prev,
      expanded: newExpanded,
      initialized: true
    }));

    if (onToggle) {
      onToggle(newExpanded);
    }
  };

  const panelClasses = [
    'gc-expansion-panel',
    state.expanded && 'gc-expansion-panel--expanded',
    disabled && 'gc-expansion-panel--disabled',
    className
  ].filter(Boolean).join(' ');

  // Determine header props based on header content type
  const getHeaderProps = () => {
    if (typeof header === 'object' && header !== null && 'props' in header) {
      // If header is a React element, check if it has title/description props
      const headerElement = header as React.ReactElement;
      const headerProps = headerElement.props;
      
      return {
        title: headerProps.title,
        description: headerProps.description,
        children: !headerProps.title && !headerProps.description ? header : undefined
      };
    }
    
    // If header is just content, pass it as children
    return {
      children: header
    };
  };

  const headerProps = getHeaderProps();

  return (
    <div
      className={panelClasses}
      id={id}
      data-testid={dataTestId}
    >
      <GCExpansionPanelHeader
        expanded={state.expanded}
        disabled={disabled}
        hideToggle={hideToggle}
        onClick={handleToggle}
        data-testid={`${dataTestId}-header`}
        {...headerProps}
      />
      
      <GCExpansionPanelContent
        expanded={state.expanded}
        lazy={lazy}
        data-testid={`${dataTestId}-content`}
      >
        {children}
      </GCExpansionPanelContent>
    </div>
  );
};

export default GCExpansionPanel;