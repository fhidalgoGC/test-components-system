import { useState } from 'react';
import { WrapperItemsSelected, useSelection } from '@/lib/ui-library/components/WrapperItemsSelected';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const items = [
  { id: '1', name: 'Item 1', color: 'bg-blue-100 dark:bg-blue-900' },
  { id: '2', name: 'Item 2', color: 'bg-green-100 dark:bg-green-900' },
  { id: '3', name: 'Item 3', color: 'bg-purple-100 dark:bg-purple-900' },
  { id: '4', name: 'Item 4', color: 'bg-orange-100 dark:bg-orange-900' },
  { id: '5', name: 'Item 5', color: 'bg-pink-100 dark:bg-pink-900' },
];

const SelectableCard = ({ id, name, color }: { id: string; name: string; color: string }) => {
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(id);

  return (
    <Card
      className={`cursor-pointer transition-all ${
        selected ? 'ring-2 ring-primary shadow-lg' : ''
      } ${color}`}
      onClick={() => toggleSelection(id)}
      data-testid={`card-item-${id}`}
    >
      <CardContent className="p-4 flex items-center justify-between">
        <span className="font-medium text-foreground">{name}</span>
        {selected && (
          <span className="text-primary font-bold" data-testid={`selected-indicator-${id}`}>
            ✓
          </span>
        )}
      </CardContent>
    </Card>
  );
};

const ControlButtons = () => {
  const { clearSelection, selectAll, selectedIds } = useSelection();
  const allIds = items.map(item => item.id);

  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        onClick={() => selectAll(allIds)}
        variant="default"
        data-testid="button-select-all"
      >
        Seleccionar Todo
      </Button>
      <Button
        onClick={clearSelection}
        variant="outline"
        data-testid="button-clear-selection"
      >
        Limpiar Selección
      </Button>
      <div className="flex-1 flex items-center justify-end">
        <span className="text-sm text-muted-foreground" data-testid="text-selection-count">
          {selectedIds.length} de {items.length} seleccionados
        </span>
      </div>
    </div>
  );
};

export const ControlExample = () => {
  const [multiSelect, setMultiSelect] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={multiSelect}
            onChange={(e) => {
              setMultiSelect(e.target.checked);
              setSelectedIds([]); // Limpiar al cambiar modo
            }}
            className="w-4 h-4"
            data-testid="checkbox-multi-select"
          />
          <span className="text-sm font-medium text-foreground">
            Selección Múltiple
          </span>
        </label>
        <span className="text-xs text-muted-foreground">
          {multiSelect ? 'Puedes seleccionar varios items' : 'Solo un item a la vez'}
        </span>
      </div>

      <WrapperItemsSelected
        multiSelect={multiSelect}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      >
        <ControlButtons />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {items.map((item) => (
            <SelectableCard key={item.id} {...item} />
          ))}
        </div>
      </WrapperItemsSelected>

      <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <h4 className="font-semibold mb-2 text-foreground">Selección Actual:</h4>
        <code className="text-sm text-foreground" data-testid="text-selected-ids">
          {selectedIds.length > 0 ? JSON.stringify(selectedIds) : 'Ninguno'}
        </code>
      </div>
    </div>
  );
};
