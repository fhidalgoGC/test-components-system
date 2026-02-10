import { useState } from 'react';
import { List } from '@/lib/ui-library/components/List';
import { mockProducts, ProductCard } from './shared';
import type { Product } from './shared';

export const SelectableListDemo = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [singleSelectedIds, setSingleSelectedIds] = useState<string[]>([]);
  const [lastAction, setLastAction] = useState<string>('');

  const demoProducts = mockProducts.slice(0, 6);

  return (
    <div className="space-y-8">
      <section className="space-y-4 border rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white" data-testid="text-section-multi-select">
          Multi-Select
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Haz click en los items para seleccionar varios. El borde azul indica selección.
        </p>

        <div className="flex gap-2 flex-wrap mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300" data-testid="text-selected-count">
            Seleccionados: {selectedIds.length}
          </span>
          {selectedIds.length > 0 && (
            <span className="text-xs text-gray-400" data-testid="text-selected-ids">
              IDs: [{selectedIds.join(', ')}]
            </span>
          )}
        </div>

        {lastAction && (
          <div className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded" data-testid="text-last-action">
            Última acción: {lastAction}
          </div>
        )}

        <List<Product>
          id="multi-select-list"
          data={demoProducts}
          layout={{ widthMode: 'full', heightMode: 'auto' }}
          item={{
            renderType: 'component',
            render: (product) => <ProductCard product={product} />,
          }}
          selectionConfig={{
            getItemId: (product) => String(product.id),
            multiSelect: true,
            selectedIds: selectedIds,
            onSelectionChange: setSelectedIds,
            onItemAction: (event) => setLastAction(`${event.id} → ${event.action}`),
            selectionStyle: {
              border: '2px solid #3b82f6',
              borderRadius: 8,
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
            },
          }}
        />
      </section>

      <section className="space-y-4 border rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white" data-testid="text-section-single-select">
          Single-Select
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Solo un item puede estar seleccionado a la vez. Estilo con borde verde.
        </p>

        <div className="mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300" data-testid="text-single-selected">
            Seleccionado: {singleSelectedIds.length > 0 ? singleSelectedIds[0] : 'ninguno'}
          </span>
        </div>

        <List<Product>
          id="single-select-list"
          data={demoProducts.slice(0, 4)}
          layout={{ widthMode: 'full', heightMode: 'auto' }}
          item={{
            renderType: 'component',
            render: (product) => <ProductCard product={product} />,
          }}
          selectionConfig={{
            getItemId: (product) => String(product.id),
            multiSelect: false,
            selectedIds: singleSelectedIds,
            onSelectionChange: setSingleSelectedIds,
            selectionStyle: {
              border: '2px solid #10b981',
              borderRadius: 8,
              backgroundColor: 'rgba(16, 185, 129, 0.05)',
            },
          }}
        />
      </section>

      <section className="space-y-4 border rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white" data-testid="text-section-custom-style">
          Estilo Personalizado
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Selección con sombra y fondo personalizado.
        </p>

        <List<Product>
          id="custom-style-list"
          data={demoProducts.slice(0, 4)}
          layout={{ widthMode: 'full', heightMode: 'auto' }}
          item={{
            renderType: 'component',
            render: (product) => <ProductCard product={product} />,
          }}
          selectionConfig={{
            getItemId: (product) => String(product.id),
            multiSelect: true,
            selectionStyle: {
              border: '2px solid #8b5cf6',
              borderRadius: 12,
              backgroundColor: 'rgba(139, 92, 246, 0.08)',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)',
            },
          }}
        />
      </section>
    </div>
  );
};
