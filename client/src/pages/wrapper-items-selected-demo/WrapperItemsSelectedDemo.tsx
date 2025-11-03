import { useState } from 'react';
import { WrapperItemsSelected, useSelection } from '@/lib/ui-library/components/WrapperItemsSelected';
import type { ItemActionEvent } from '@/lib/ui-library/components/WrapperItemsSelected';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { ControlExample } from './examples/ControlExample';
import { FlowExample } from './examples/FlowExample';

// Selectable Card Component
interface SelectableCardProps {
  id: string;
  title: string;
  description: string;
}

const SelectableCard = ({ id, title, description }: SelectableCardProps) => {
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(id);

  return (
    <Card
      className={`cursor-pointer transition-all ${
        selected 
          ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
      onClick={() => toggleSelection(id)}
      data-testid={`card-${id}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {selected && (
          <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
};

// Selectable List Item Component
interface SelectableListItemProps {
  id: string;
  name: string;
  email: string;
}

const SelectableListItem = ({ id, name, email }: SelectableListItemProps) => {
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(id);

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
        selected 
          ? 'bg-blue-100 dark:bg-blue-900' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      onClick={() => toggleSelection(id)}
      data-testid={`list-item-${id}`}
    >
      <div
        className={`h-5 w-5 rounded border-2 flex items-center justify-center ${
          selected 
            ? 'bg-blue-500 border-blue-500' 
            : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        {selected && <Check className="h-3 w-3 text-white" />}
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
      </div>
    </div>
  );
};

export default function WrapperItemsSelectedDemo() {
  // Example 1: Uncontrolled mode with cards
  const [selectionLog, setSelectionLog] = useState<string[]>([]);
  const [actionLog, setActionLog] = useState<string[]>([]);

  // Example 2: Controlled mode with list
  const [controlledSelection, setControlledSelection] = useState<string[]>(['user-2']);
  
  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectionLog(prev => [...prev.slice(-4), `Selection changed: [${selectedIds.join(', ')}]`]);
  };

  const handleItemAction = (event: ItemActionEvent) => {
    setActionLog(prev => [...prev.slice(-4), `Item ${event.id} ${event.action}`]);
  };

  const products = [
    { id: 'product-1', title: 'Premium Plan', description: 'Advanced features for professionals' },
    { id: 'product-2', title: 'Basic Plan', description: 'Essential features for beginners' },
    { id: 'product-3', title: 'Enterprise Plan', description: 'Custom solutions for large teams' },
    { id: 'product-4', title: 'Starter Plan', description: 'Get started with core features' },
  ];

  const users = [
    { id: 'user-1', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 'user-2', name: 'Bob Smith', email: 'bob@example.com' },
    { id: 'user-3', name: 'Carol White', email: 'carol@example.com' },
    { id: 'user-4', name: 'David Brown', email: 'david@example.com' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            WrapperItemsSelected Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            A versatile wrapper component for managing item selection with callbacks
          </p>
        </div>

        {/* Example 0: Flow Explanation */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              🔄 Flujo de Comunicación (5 Cards)
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Cada card avisa solo de SU ID. El wrapper mantiene el array completo de seleccionados.
            </p>
          </div>

          <FlowExample />
        </div>

        {/* Example 1: Uncontrolled Mode with Cards */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Example 1: Uncontrolled Multi-Select (Cards)
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click on cards to select/deselect. Component manages its own state.
            </p>
          </div>

          <WrapperItemsSelected
            defaultSelectedIds={['product-2']}
            multiSelect={true}
            onSelectionChange={handleSelectionChange}
            onItemAction={handleItemAction}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map(product => (
                <SelectableCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                />
              ))}
            </div>
          </WrapperItemsSelected>

          {/* Logs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">onSelectionChange Callback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-xs font-mono">
                  {selectionLog.length === 0 ? (
                    <p className="text-gray-400">No changes yet...</p>
                  ) : (
                    selectionLog.map((log, i) => (
                      <p key={i} className="text-gray-700 dark:text-gray-300">{log}</p>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">onItemAction Callback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-xs font-mono">
                  {actionLog.length === 0 ? (
                    <p className="text-gray-400">No actions yet...</p>
                  ) : (
                    actionLog.map((log, i) => (
                      <p key={i} className="text-gray-700 dark:text-gray-300">{log}</p>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Example 2: Controlled Mode with List */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Example 2: Controlled Mode (List)
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Parent component controls the selection state. External controls available.
            </p>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className="text-sm">
              Selected: {controlledSelection.length}
            </Badge>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setControlledSelection(users.map(u => u.id))}
                data-testid="button-select-all"
              >
                Select All
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setControlledSelection([])}
                data-testid="button-clear-all"
              >
                Clear All
              </Button>
            </div>
          </div>

          <WrapperItemsSelected
            selectedIds={controlledSelection}
            onSelectionChange={setControlledSelection}
            multiSelect={true}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-2">
              {users.map(user => (
                <SelectableListItem
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  email={user.email}
                />
              ))}
            </div>
          </WrapperItemsSelected>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Selected IDs (Controlled State)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                {controlledSelection.length > 0 
                  ? `[${controlledSelection.join(', ')}]` 
                  : 'None selected'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Example 3: Single Select Mode */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Example 3: Single Select Mode
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Only one item can be selected at a time (multiSelect=false).
            </p>
          </div>

          <WrapperItemsSelected
            defaultSelectedIds={['product-1']}
            multiSelect={false}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.slice(0, 2).map(product => (
                <SelectableCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                />
              ))}
            </div>
          </WrapperItemsSelected>
        </div>

        {/* Example 4: Complete Controls (clearSelection, selectAll, multiSelect toggle) */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Example 4: Complete Controls
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Demonstrates clearSelection(), selectAll(), and multiSelect toggle functionality.
            </p>
          </div>

          <ControlExample />
        </div>

        {/* API Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>API Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">Props</h3>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">selectedIds</code> - Controlled selection (array of IDs)</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">defaultSelectedIds</code> - Initial selection (uncontrolled)</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">onSelectionChange</code> - Callback with full array of selected IDs</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">onItemAction</code> - Callback for each select/deselect action</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">multiSelect</code> - Allow multiple selections (default: true)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2">useSelection Hook (for children)</h3>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">selectedIds</code> - Array of currently selected IDs</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">toggleSelection(id)</code> - Toggle selection state</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">selectItem(id)</code> - Select an item</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">deselectItem(id)</code> - Deselect an item</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">isSelected(id)</code> - Check if item is selected</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-green-600 dark:text-green-400 font-semibold">clearSelection()</code> - ✨ Clear all selections</li>
                <li><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-green-600 dark:text-green-400 font-semibold">selectAll(ids)</code> - ✨ Select multiple items</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
