import { useState, useEffect, useRef } from 'react';
import type { BottomNavigationBarProps, NavItem } from '../types';

export const useBottomNavigationBar = (props: BottomNavigationBarProps) => {
  const {
    items = [],
    selectedId,
    defaultSelectedId,
    triggerOnMount = false,
    onSelect,
  } = props;

  const isControlled = selectedId !== undefined;
  const hasMountedRef = useRef(false);
  const previousSelectedIdRef = useRef<string | undefined>(selectedId);

  // Find first enabled item for default selection
  const getDefaultItem = (): string | null => {
    if (defaultSelectedId) {
      const item = items.find(i => i.id === defaultSelectedId && !i.metadata?.isDisabled);
      if (item) return defaultSelectedId;
    }
    const firstEnabled = items.find(i => !i.metadata?.isDisabled);
    return firstEnabled?.id || null;
  };

  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(
    () => (isControlled ? selectedId || null : getDefaultItem())
  );

  const currentSelectedId = isControlled ? selectedId || null : internalSelectedId;

  // Handle external selectedId changes (controlled mode)
  useEffect(() => {
    if (isControlled && selectedId !== previousSelectedIdRef.current) {
      previousSelectedIdRef.current = selectedId;
      
      // Only trigger callback if the ID actually changed and it's not the initial mount
      if (hasMountedRef.current && selectedId) {
        const item = items.find(i => i.id === selectedId);
        if (item && onSelect) {
          onSelect(item);
        }
      }
    }
  }, [selectedId, isControlled, items, onSelect]);

  // Handle triggerOnMount
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      
      if (triggerOnMount && currentSelectedId) {
        const item = items.find(i => i.id === currentSelectedId);
        if (item && onSelect) {
          onSelect(item);
        }
      }
    }
  }, [triggerOnMount, currentSelectedId, items, onSelect]);

  // Handle item click
  const handleItemClick = (item: NavItem) => {
    if (item.metadata?.isDisabled) return;

    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalSelectedId(item.id);
    }

    // Always trigger callback on click
    if (onSelect) {
      onSelect(item);
    }
  };

  return {
    selectedId: currentSelectedId,
    onItemClick: handleItemClick,
  };
};
