import { useState } from 'react';
import { List } from '@/lib/ui-library/components/List';
import { mockProducts, ProductCard } from './shared';
import type { Product } from './shared';

interface ProductSummary {
  id: number;
  name: string;
}

export const SelectableListDemo = () => {
  const [selectedItems, setSelectedItems] = useState<ProductSummary[]>([]);
  const [singleSelectedIds, setSingleSelectedIds] = useState<string[]>([]);
  const [lastAction, setLastAction] = useState<string>('');

  const demoProducts = mockProducts.slice(0, 6);

  return (
    <div className="space-y-8">
      <section className="space-y-4 border rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white" data-testid="text-section-multi-select">
          Multi-Select con getItem
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Usa getItem para transformar T en la interfaz que necesites. Aquí solo devuelve id y name.
        </p>

        <div className="flex gap-2 flex-wrap mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300" data-testid="text-selected-count">
            Seleccionados: {selectedItems.length}
          </span>
        </div>

        {selectedItems.length > 0 && (
          <div className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded space-y-1" data-testid="text-selected-items">
            {selectedItems.map((item) => (
              <div key={item.id}>#{item.id} - {item.name}</div>
            ))}
          </div>
        )}

        {lastAction && (
          <div className="text-xs bg-blue-50 dark:bg-blue-900 p-2 rounded" data-testid="text-last-action">
            Última acción: {lastAction}
          </div>
        )}

        <List<Product>
          id="multi-select-list"
          data={demoProducts}
          layout={{ widthMode: 'full', heightMode: 'auto', gap: 8 }}
          item={{
            renderType: 'component',
            render: (product) => <ProductCard product={product} />,
          }}
          selectionConfig={{
            getItemId: (product) => String(product.id),
            getItem: (product): ProductSummary => ({ id: product.id, name: product.name }),
            multiSelect: true,
            onSelectionChange: setSelectedItems,
            onItemAction: (event) => setLastAction(`${JSON.stringify(event.item)} → ${event.action}`),
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
          Single-Select sin getItem
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sin getItem, los callbacks devuelven solo los IDs (string[]).
        </p>

        <div className="mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300" data-testid="text-single-selected">
            Seleccionado: {singleSelectedIds.length > 0 ? singleSelectedIds[0] : 'ninguno'}
          </span>
        </div>

        <List<Product>
          id="single-select-list"
          data={demoProducts.slice(0, 4)}
          layout={{ widthMode: 'full', heightMode: 'auto', gap: 8 }}
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
          layout={{ widthMode: 'full', heightMode: 'auto', gap: 8 }}
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
