import type { GridProps, GridSelectionStyle } from '../../shared/types';
import { WrapperItemsSelected, useSelectionSafe } from '../../../WrapperItemsSelected';
import { GridView } from '../views';
import { useRef, useCallback } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { ItemActionEvent } from '../../../WrapperItemsSelected/types';

interface SelectableItemProps {
  itemId: string;
  selectionStyle?: GridSelectionStyle;
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
      style={{ cursor: 'pointer', transition: 'all 0.15s ease', borderRadius: '8px', ...selectedStyles }}
      data-testid={testId}
      data-selected={isSelected}
      role="option"
      aria-selected={isSelected}
    >
      {children}
    </div>
  );
};

export const GridSelectableLayout = <T,>(props: GridProps<T>) => {
  const { selectionConfig, item, id, ...restProps } = props;

  if (!selectionConfig) {
    return <GridView {...props} />;
  }

  const { getItemId, getItem, multiSelect = true, selectedIds, defaultSelectedIds, onSelectionChange, onItemAction, selectionStyle } = selectionConfig;

  const itemMapRef = useRef<Map<string, { data: T; index: number }>>(new Map());

  const handleSelectionChange = useCallback((ids: string[]) => {
    if (!onSelectionChange) return;

    if (!getItem) {
      onSelectionChange(ids as any);
      return;
    }

    const transformedItems = ids
      .map((itemId) => {
        const entry = itemMapRef.current.get(itemId);
        if (entry) return getItem(entry.data, entry.index);
        return undefined;
      })
      .filter((item): item is any => item !== undefined);

    onSelectionChange(transformedItems);
  }, [onSelectionChange, getItem]);

  const handleItemAction = useCallback((event: ItemActionEvent) => {
    if (!onItemAction) return;

    if (!getItem) {
      onItemAction({ item: event.id as any, action: event.action });
      return;
    }

    const entry = itemMapRef.current.get(event.id);
    if (entry) {
      onItemAction({ item: getItem(entry.data, entry.index), action: event.action });
    }
  }, [onItemAction, getItem]);

  const wrappedItem = {
    ...item,
    render: (dataItem: T, index: number) => {
      const itemId = getItemId(dataItem, index);
      itemMapRef.current.set(itemId, { data: dataItem, index });
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
      onSelectionChange={handleSelectionChange}
      onItemAction={handleItemAction}
    >
      <GridView {...restProps} id={id} item={wrappedItem} />
    </WrapperItemsSelected>
  );
};
