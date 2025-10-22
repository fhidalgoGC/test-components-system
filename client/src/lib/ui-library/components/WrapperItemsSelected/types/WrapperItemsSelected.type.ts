export interface ItemActionEvent {
  id: string;
  action: 'selected' | 'deselected';
}

export interface WrapperItemsSelectedProps {
  children?: React.ReactNode;
  className?: string;
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onItemAction?: (event: ItemActionEvent) => void;
  multiSelect?: boolean;
}

export interface SelectionContextValue {
  selectedIds: string[];
  toggleSelection: (id: string) => void;
  selectItem: (id: string) => void;
  deselectItem: (id: string) => void;
  isSelected: (id: string) => boolean;
  clearSelection: () => void;
  selectAll: (ids: string[]) => void;
}
