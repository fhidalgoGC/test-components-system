import { useState, useEffect, useCallback, useRef } from 'react';
import { List } from '@/lib/ui-library/components/List';
import { useListController } from '@/lib/ui-library/components/List/shared/useListController';
import type { InternalListController } from '@/lib/ui-library/components/List/shared/List.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2, X } from 'lucide-react';
import { Product, mockProducts, fetchProducts, ProductCard } from './shared';

interface SelectedProduct {
  id: number;
  name: string;
  price: number;
}

export const InfiniteScrollDemo = () => {
  const [loading, setLoading] = useState(true);
  const isLoadingMoreRef = useRef(false);
  const pageSize = 8;

  const controller = useListController<Product>();
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  
  const [controllerState, setControllerState] = useState({
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    loadedItems: 0,
  });

  useEffect(() => {
    controller.setPageSize(pageSize);
    controller.setTotalItems(mockProducts.length);
  }, [controller]);

  useEffect(() => {
    const internalController = controller as InternalListController<Product>;
    const updateState = () => {
      setControllerState({
        currentPage: controller.getPage(),
        totalPages: controller.getTotalPages(),
        totalItems: controller.getTotalItems(),
        loadedItems: controller.getLoadedItems(),
      });
    };
    updateState();
    return internalController._subscribe(updateState);
  }, [controller]);

  useEffect(() => {
    const loadInitial = async () => {
      const data = await fetchProducts(1, pageSize);
      controller.setData(data);
      setLoading(false);
    };
    loadInitial();
  }, [controller]);

  const handleReset = async () => {
    setLoading(true);
    setSelectedProducts([]);
    controller.reload();
    const data = await fetchProducts(1, pageSize);
    controller.setData(data);
    setLoading(false);
  };

  const handleInfiniteScroll = useCallback(async (page: number) => {
    const totalPages = controller.getTotalPages();
    if (isLoadingMoreRef.current || page > totalPages) {
      return;
    }
    isLoadingMoreRef.current = true;
    controller.setRenderState('renderLoading');
    
    const data = await fetchProducts(page, pageSize);
    if (data.length > 0) {
      controller.appendData(data);
    }
    
    controller.setRenderState('renderComplete');
    isLoadingMoreRef.current = false;
  }, [pageSize, controller]);

  if (loading) {
    return (
      <Card data-testid="card-example2">
        <CardHeader>
          <CardTitle>Example 2: Infinite Scroll + Multi-Select</CardTitle>
          <CardDescription>
            Scroll infinito con selección múltiple. Usa getItem para devolver solo id, name y price.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="card-example2">
      <CardHeader>
        <CardTitle>Example 2: Infinite Scroll + Multi-Select</CardTitle>
        <CardDescription>
          Scroll infinito con selección múltiple. Usa getItem para devolver solo id, name y price.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4 flex-wrap">
          <Button onClick={handleReset} variant="outline" size="sm" data-testid="button-reset-example2">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <span className="text-sm text-gray-500" data-testid="text-pagination-info">
            Showing {controllerState.loadedItems} of {controllerState.totalItems} items (Page {controllerState.currentPage} of {controllerState.totalPages})
          </span>
        </div>

        {selectedProducts.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg" data-testid="text-selected-summary">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {selectedProducts.length} seleccionados — Total: ${selectedProducts.reduce((sum, p) => sum + p.price, 0)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProducts([])}
                className="h-6 px-2 text-blue-600"
                data-testid="button-clear-selection"
              >
                <X className="w-3 h-3 mr-1" />
                Limpiar
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedProducts.map((p) => (
                <span key={p.id} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded" data-testid={`tag-selected-${p.id}`}>
                  {p.name} (${p.price})
                </span>
              ))}
            </div>
          </div>
        )}

        <List<Product>
          id="infinite-list"
          controller={controller}
          layout={{
            widthMode: 'full',
            heightMode: 'fixed',
            height: 300,
            gap: 8
          }}
          behaviors={{
            scroll: 'infinityScroll',
            paginator: { maxItem: pageSize }
          }}
          loading={{
            renderType: 'self',
            position: 'bottom'
          }}
          callbacks={{
            onScrollInfinity: handleInfiniteScroll
          }}
          item={{
            renderType: 'component',
            render: (product) => <ProductCard product={product} />
          }}
          selectionConfig={{
            getItemId: (product) => String(product.id),
            getItem: (product): SelectedProduct => ({
              id: product.id,
              name: product.name,
              price: product.price,
            }),
            multiSelect: true,
            onSelectionChange: setSelectedProducts,
            selectionStyle: {
              border: '2px solid #3b82f6',
              borderRadius: 8,
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
            },
          }}
        />
        {controllerState.currentPage === controllerState.totalPages && controllerState.loadedItems > 0 && (
          <div className="flex items-center justify-center py-3 border-t text-sm text-muted-foreground">
            All {controllerState.totalItems} items loaded
          </div>
        )}
      </CardContent>
    </Card>
  );
};
