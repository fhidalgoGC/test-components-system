import type { ListProps, SelectionStyle } from '../../shared/List.types';
import { WrapperItemsSelected, useSelectionSafe } from '../../../WrapperItemsSelected';
import { ListView } from './List.view';
import type { CSSProperties, ReactNode } from 'react';

interface SelectableItemProps {
  itemId: string;
  selectionStyle?: SelectionStyle;
  children: ReactNode;
  testId: string;
}

const SelectableItem = ({ itemId, selectionStyle, children, testId }: SelectableItemProps) => {
  const selection = useSelectionSafe();
  const isSelected = selection?.isSelected(itemId) ?? false;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selection?.toggleSelection(itemId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selection?.toggleSelection(itemId);
    }
  };

  const selectedStyles: CSSProperties = isSelected ? {
    ...(selectionStyle?.border ? { border: selectionStyle.border } : { border: '2px solid #3b82f6' }),
    ...(selectionStyle?.borderRadius !== undefined ? { borderRadius: selectionStyle.borderRadius } : {}),
    ...(selectionStyle?.backgroundColor ? { backgroundColor: selectionStyle.backgroundColor } : {}),
    ...(selectionStyle?.boxShadow ? { boxShadow: selectionStyle.boxShadow } : {}),
    ...(selectionStyle?.outline ? { outline: selectionStyle.outline } : {}),
    ...(selectionStyle?.custom || {}),
  } : {
    border: '2px solid transparent',
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ cursor: 'pointer', transition: 'all 0.15s ease', ...selectedStyles }}
      data-testid={testId}
      data-selected={isSelected}
      role="option"
      aria-selected={isSelected}
    >
      {children}
    </div>
  );
};

export const ListSelectableView = <T,>(props: ListProps<T>) => {
  const { selectionConfig, item, id, ...restProps } = props;

  if (!selectionConfig) {
    return <ListView {...props} />;
  }

  const { getItemId, multiSelect = true, selectedIds, defaultSelectedIds, onSelectionChange, onItemAction, selectionStyle } = selectionConfig;

  const wrappedItem = {
    ...item,
    render: (dataItem: T, index: number) => {
      const itemId = getItemId(dataItem, index);
      return (
        <SelectableItem
          itemId={itemId}
          selectionStyle={selectionStyle}
          testId={`${id}-selectable-item-${itemId}`}
        >
          {item.render(dataItem, index)}
        </SelectableItem>
      );
    },
  };

  return (
    <WrapperItemsSelected
      multiSelect={multiSelect}
      selectedIds={selectedIds}
      defaultSelectedIds={defaultSelectedIds}
      onSelectionChange={onSelectionChange}
      onItemAction={onItemAction}
    >
      <ListView {...restProps} id={id} item={wrappedItem} />
    </WrapperItemsSelected>
  );
};
