import { useState, useEffect, useCallback, useRef } from 'react';
import { List } from '@/lib/ui-library/components/List';
import { useListController } from '@/lib/ui-library/components/List/shared/useListController';
import type { InternalListController } from '@/lib/ui-library/components/List/shared/List.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2 } from 'lucide-react';
import { Product, mockProducts, fetchProducts, ProductCard } from './shared';

export const InfiniteScrollDemo = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const isLoadingMoreRef = useRef(false);
  const pageSize = 8;

  const controller = useListController<Product>();
  
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
      setProducts(data);
      setLoading(false);
    };
    loadInitial();
  }, []);

  const handleReset = async () => {
    setLoading(true);
    setProducts([]);
    controller.reload();
    const data = await fetchProducts(1, pageSize);
    setProducts(data);
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
      setProducts(prev => [...prev, ...data]);
    }
    
    controller.setRenderState('renderComplete');
    isLoadingMoreRef.current = false;
  }, [pageSize, controller]);

  if (loading) {
    return (
      <Card data-testid="card-example2">
        <CardHeader>
          <CardTitle>Example 2: Infinite Scroll</CardTitle>
          <CardDescription>
            Scroll infinito usando IntersectionObserver. Dispara onScrollInfinity al llegar al final.
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
        <CardTitle>Example 2: Infinite Scroll</CardTitle>
        <CardDescription>
          Scroll infinito usando IntersectionObserver. Dispara onScrollInfinity al llegar al final.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
          <Button onClick={handleReset} variant="outline" size="sm" data-testid="button-reset-example2">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <span className="text-sm text-gray-500">
            Showing {controllerState.loadedItems} of {controllerState.totalItems} items (Page {controllerState.currentPage} of {controllerState.totalPages})
          </span>
        </div>
        <List
          id="infinite-list"
          controller={controller}
          layout={{
            widthMode: 'full',
            heightMode: 'fixed',
            height: 250
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
          data={products}
          item={{
            renderType: 'component',
            render: (product) => <ProductCard product={product} />
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
