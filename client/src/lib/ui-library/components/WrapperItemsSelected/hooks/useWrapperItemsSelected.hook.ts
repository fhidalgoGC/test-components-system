import { useState, useCallback, useEffect, useRef } from 'react';
import type { WrapperItemsSelectedProps, ItemActionEvent } from '../types';

export const useWrapperItemsSelected = (props: WrapperItemsSelectedProps) => {
  const {
    selectedIds: controlledSelectedIds,
    defaultSelectedIds = [],
    onSelectionChange,
    onItemAction,
    multiSelect = true,
  } = props;

  const isControlled = controlledSelectedIds !== undefined;
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>(defaultSelectedIds);
  const selectedIds = isControlled ? controlledSelectedIds : internalSelectedIds;
  
  const previousSelectedIdsRef = useRef<string[]>(selectedIds);

  useEffect(() => {
    previousSelectedIdsRef.current = selectedIds;
  }, [selectedIds]);

  const updateSelection = useCallback(
    (newSelectedIds: string[]) => {
      if (!isControlled) {
        setInternalSelectedIds(newSelectedIds);
      }
      
      onSelectionChange?.(newSelectedIds);
    },
    [isControlled, onSelectionChange]
  );

  const notifyItemAction = useCallback(
    (event: ItemActionEvent) => {
      onItemAction?.(event);
    },
    [onItemAction]
  );

  const toggleSelection = useCallback(
    (id: string) => {
      const isCurrentlySelected = selectedIds.includes(id);
      let newSelectedIds: string[];

      if (isCurrentlySelected) {
        newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
        notifyItemAction({ id, action: 'deselected' });
      } else {
        if (multiSelect) {
          newSelectedIds = [...selectedIds, id];
        } else {
          newSelectedIds = [id];
        }
        notifyItemAction({ id, action: 'selected' });
      }

      updateSelection(newSelectedIds);
    },
    [selectedIds, multiSelect, updateSelection, notifyItemAction]
  );

  const selectItem = useCallback(
    (id: string) => {
      if (!selectedIds.includes(id)) {
        let newSelectedIds: string[];
        
        if (multiSelect) {
          newSelectedIds = [...selectedIds, id];
        } else {
          newSelectedIds = [id];
        }
        
        updateSelection(newSelectedIds);
        notifyItemAction({ id, action: 'selected' });
      }
    },
    [selectedIds, multiSelect, updateSelection, notifyItemAction]
  );

  const deselectItem = useCallback(
    (id: string) => {
      if (selectedIds.includes(id)) {
        const newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
        updateSelection(newSelectedIds);
        notifyItemAction({ id, action: 'deselected' });
      }
    },
    [selectedIds, updateSelection, notifyItemAction]
  );

  const isSelected = useCallback(
    (id: string) => {
      return selectedIds.includes(id);
    },
    [selectedIds]
  );

  const clearSelection = useCallback(() => {
    const previousIds = [...selectedIds];
    updateSelection([]);
    
    previousIds.forEach((id) => {
      notifyItemAction({ id, action: 'deselected' });
    });
  }, [selectedIds, updateSelection, notifyItemAction]);

  const selectAll = useCallback(
    (ids: string[]) => {
      const newIds = multiSelect ? ids : (ids.length > 0 ? [ids[0]] : []);
      const previousIds = [...selectedIds];
      
      updateSelection(newIds);
      
      previousIds.forEach((id) => {
        if (!newIds.includes(id)) {
          notifyItemAction({ id, action: 'deselected' });
        }
      });
      
      newIds.forEach((id) => {
        if (!previousIds.includes(id)) {
          notifyItemAction({ id, action: 'selected' });
        }
      });
    },
    [selectedIds, multiSelect, updateSelection, notifyItemAction]
  );

  return {
    selectedIds,
    toggleSelection,
    selectItem,
    deselectItem,
    isSelected,
    clearSelection,
    selectAll,
    multiSelect,
  };
};
