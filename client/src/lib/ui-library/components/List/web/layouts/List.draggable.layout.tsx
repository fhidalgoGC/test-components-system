import { useState, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ListProps, DragHandleConfig } from '../../shared/List.types';
import { ListNormalLayout } from './List.normal.layout';
import type { ReactNode } from 'react';
import styles from '../css/List.draggable.module.css';

interface SortableItemProps {
  itemId: string;
  handle?: DragHandleConfig;
  children: ReactNode;
  testId: string;
  isDraggingActive: boolean;
  disabled?: boolean;
}

const SortableItem = ({ itemId, handle, children, testId, isDraggingActive, disabled }: SortableItemProps) => {
  const HandleComponent = handle?.render;
  const useHandleMode = !!HandleComponent && !disabled;

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: itemId,
    disabled: disabled ? { draggable: true, droppable: false } : false,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 'auto',
    position: 'relative' as const,
    cursor: disabled ? 'default' : (useHandleMode ? 'default' : (isDragging ? 'grabbing' : 'grab')),
  };

  const itemDragProps = (!disabled && !useHandleMode) ? { ...listeners, ...attributes } : {};

  const handlePosition = handle?.position ?? 'right';

  const dragHandle = useHandleMode ? (
    <div
      ref={setActivatorNodeRef}
      {...listeners}
      {...attributes}
      className={styles.dragHandle}
      data-testid={`${testId}-handle`}
      aria-label="Drag to reorder"
    >
      <HandleComponent isDragging={isDragging} />
    </div>
  ) : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...itemDragProps}
      className={`${styles.sortableItem} ${isDragging ? styles.sortableItemDragging : ''} ${isDraggingActive && !isDragging && !disabled ? styles.sortableItemDropTarget : ''} ${disabled ? styles.sortableItemDisabled : ''}`}
      data-testid={testId}
      data-dragging={isDragging}
      data-drag-disabled={disabled}
    >
      {dragHandle ? (
        <div className={styles.sortableItemContent}>
          {handlePosition === 'left' && dragHandle}
          <div className={styles.sortableItemBody}>
            {children}
          </div>
          {handlePosition === 'right' && dragHandle}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export const ListDraggableLayout = <T,>(props: ListProps<T>) => {
  const { draggableConfig, item, id, data: propData, ...restProps } = props;

  if (!draggableConfig || draggableConfig.enabled === false) {
    return <ListNormalLayout {...props} />;
  }

  const { getItemId, onReorder, handle, isItemDraggable } = draggableConfig;
  const [internalData, setInternalData] = useState<T[] | null>(null);
  const [isDraggingActive, setIsDraggingActive] = useState(false);

  const currentData = internalData ?? propData ?? [];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const itemIds = currentData.map((dataItem, index) => getItemId(dataItem, index));

  const handleDragStart = useCallback((_event: DragStartEvent) => {
    setIsDraggingActive(true);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setIsDraggingActive(false);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = itemIds.indexOf(String(active.id));
    const newIndex = itemIds.indexOf(String(over.id));

    if (oldIndex === -1 || newIndex === -1) return;

    const newData = arrayMove([...currentData], oldIndex, newIndex);
    setInternalData(newData);

    onReorder?.(newData, {
      item: currentData[oldIndex],
      fromIndex: oldIndex,
      toIndex: newIndex,
    });
  }, [itemIds, currentData, onReorder]);

  const wrappedItem = {
    ...item,
    render: (dataItem: T, index: number) => {
      const itemId = getItemId(dataItem, index);
      const itemDisabled = isItemDraggable ? !isItemDraggable(dataItem, index) : false;
      return (
        <SortableItem
          itemId={itemId}
          handle={handle}
          testId={`${id}-draggable-item-${itemId}`}
          isDraggingActive={isDraggingActive}
          disabled={itemDisabled}
        >
          {item.render(dataItem, index)}
        </SortableItem>
      );
    },
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <ListNormalLayout {...restProps} id={id} item={wrappedItem} data={currentData} />
      </SortableContext>
    </DndContext>
  );
};
