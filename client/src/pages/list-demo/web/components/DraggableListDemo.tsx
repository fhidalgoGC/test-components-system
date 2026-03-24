import { useState } from 'react';
import { List } from '@/lib/ui-library/components/List';
import type { DraggableReorderEvent } from '@/lib/ui-library/components/List';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, GripVertical, Lock, LockOpen } from 'lucide-react';
import { mockProducts } from './shared';
import type { Product } from './shared';

const CustomHandle = ({ isDragging }: { isDragging: boolean }) => (
  <GripVertical
    className={`w-5 h-5 transition-colors ${isDragging ? 'text-blue-500' : 'text-gray-400'}`}
  />
);

export const DraggableListDemo = () => {
  const initialProducts = mockProducts.slice(0, 6);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [lastReorder, setLastReorder] = useState<string>('');
  const [dragEnabled, setDragEnabled] = useState(true);
  const [lockedIds, setLockedIds] = useState<Set<number>>(new Set([2, 4]));

  const handleReorder = (newData: Product[], event: DraggableReorderEvent<Product>) => {
    setProducts(newData);
    setLastReorder(
      `"${event.item.name}" moved from position ${event.fromIndex + 1} to ${event.toIndex + 1}`
    );
  };

  const handleReset = () => {
    setProducts([...initialProducts]);
    setLastReorder('');
  };

  const toggleLock = (id: number) => {
    setLockedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-8">
      <Card data-testid="card-drag-basic">
        <CardHeader>
          <CardTitle>Example 5: Drag & Drop (enabled flag)</CardTitle>
          <CardDescription>
            Agarra cualquier item para arrastrarlo. Usa el toggle para activar/desactivar el D&D globalmente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4 flex-wrap">
            <Button onClick={handleReset} variant="outline" size="sm" data-testid="button-reset-drag">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>
            <Button
              onClick={() => setDragEnabled(!dragEnabled)}
              variant={dragEnabled ? 'default' : 'secondary'}
              size="sm"
              data-testid="button-toggle-drag"
            >
              {dragEnabled ? 'Desactivar D&D' : 'Activar D&D'}
            </Button>
            <span className="text-xs text-gray-400" data-testid="text-drag-status">
              enabled: {String(dragEnabled)}
            </span>
            {lastReorder && (
              <span className="text-sm text-gray-500" data-testid="text-last-reorder">
                {lastReorder}
              </span>
            )}
          </div>

          <List<Product>
            id="draggable-basic-list"
            data={products}
            layout={{
              widthMode: 'full',
              heightMode: 'auto',
              gap: 8,
            }}
            item={{
              renderType: 'component',
              render: (product) => (
                <div className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-gray-400 w-6">#{product.id}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-green-600">${product.price}</span>
                </div>
              ),
            }}
            draggableConfig={{
              enabled: dragEnabled,
              getItemId: (product) => String(product.id),
              onReorder: handleReorder,
            }}
          />

          <div className="mt-4 p-3 bg-gray-50 rounded-lg" data-testid="text-current-order">
            <span className="text-sm font-medium text-gray-700">Orden actual: </span>
            <span className="text-sm text-gray-500">
              {products.map(p => `#${p.id}`).join(' → ')}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card data-testid="card-drag-per-item">
        <CardHeader>
          <CardTitle>Example 6: Drag & Drop (isItemDraggable por item)</CardTitle>
          <CardDescription>
            Haz clic en el candado de cada item para bloquear/desbloquear. Los items bloqueados no se pueden arrastrar pero se desplazan cuando otros se mueven.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-gray-700">Controles:</span>
            {products.map(p => {
              const isLocked = lockedIds.has(p.id);
              return (
                <Button
                  key={p.id}
                  onClick={() => toggleLock(p.id)}
                  variant={isLocked ? 'destructive' : 'outline'}
                  size="sm"
                  className="gap-1.5"
                  data-testid={`button-lock-${p.id}`}
                >
                  {isLocked ? <Lock className="w-3.5 h-3.5" /> : <LockOpen className="w-3.5 h-3.5" />}
                  #{p.id}
                </Button>
              );
            })}
          </div>

          <List<Product>
            id="draggable-per-item-list"
            data={products}
            layout={{
              widthMode: 'full',
              heightMode: 'auto',
              gap: 8,
            }}
            item={{
              renderType: 'component',
              render: (product) => {
                const isLocked = lockedIds.has(product.id);
                return (
                  <div className={`flex items-center justify-between p-4 border rounded-lg shadow-sm transition-colors ${isLocked ? 'bg-red-50 border-red-200 border-dashed' : 'bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-gray-400 w-6">#{product.id}</span>
                      <div>
                        <h4 className={`font-medium ${isLocked ? 'text-red-400' : 'text-gray-900'}`}>{product.name}</h4>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isLocked && <Lock className="w-4 h-4 text-red-300" />}
                      <span className="text-lg font-semibold text-green-600">${product.price}</span>
                    </div>
                  </div>
                );
              },
            }}
            draggableConfig={{
              getItemId: (product) => String(product.id),
              isItemDraggable: (product) => !lockedIds.has(product.id),
              onReorder: handleReorder,
            }}
          />

          <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm" data-testid="text-locked-info">
            <span className="font-medium text-gray-700">Bloqueados: </span>
            <span className="text-gray-500">
              {lockedIds.size === 0
                ? 'Ninguno (todos arrastrables)'
                : Array.from(lockedIds).sort((a, b) => a - b).map(id => `#${id}`).join(', ')}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card data-testid="card-drag-custom-handle">
        <CardHeader>
          <CardTitle>Example 7: Drag & Drop (custom handle)</CardTitle>
          <CardDescription>
            En este ejemplo solo se puede arrastrar desde el handle personalizado (icono a la izquierda), no desde el item completo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <List<Product>
            id="draggable-custom-list"
            data={products}
            layout={{
              widthMode: 'full',
              heightMode: 'fixed',
              height: 300,
              gap: 8,
            }}
            behaviors={{
              scroll: 'normal',
            }}
            item={{
              renderType: 'component',
              render: (product) => (
                <div className="flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm">
                  <div>
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-xs text-gray-500">{product.category} — ${product.price}</p>
                  </div>
                </div>
              ),
            }}
            draggableConfig={{
              getItemId: (product) => String(product.id),
              onReorder: handleReorder,
              handle: {
                render: CustomHandle,
                position: 'left',
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
