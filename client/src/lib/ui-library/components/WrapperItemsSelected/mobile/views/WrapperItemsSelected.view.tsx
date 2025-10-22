import { createContext, useContext } from 'react';
import type { WrapperItemsSelectedProps, SelectionContextValue } from '../types';
import { useWrapperItemsSelected } from '../hooks';
import { wrapperItemsSelectedStyles } from '../css';
import { cn } from '../../../../utils';

const SelectionContext = createContext<SelectionContextValue | null>(null);

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within WrapperItemsSelected');
  }
  return context;
};

export const WrapperItemsSelectedView = (props: WrapperItemsSelectedProps) => {
  const { children, className } = props;
  
  const {
    selectedIds,
    toggleSelection,
    selectItem,
    deselectItem,
    isSelected,
    clearSelection,
    selectAll,
  } = useWrapperItemsSelected(props);

  const contextValue: SelectionContextValue = {
    selectedIds,
    toggleSelection,
    selectItem,
    deselectItem,
    isSelected,
    clearSelection,
    selectAll,
  };

  return (
    <SelectionContext.Provider value={contextValue}>
      <div 
        className={cn(wrapperItemsSelectedStyles.container, className)}
        data-testid="wrapper-items-selected"
      >
        {children}
      </div>
    </SelectionContext.Provider>
  );
};
