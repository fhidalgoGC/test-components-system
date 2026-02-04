import { useState, useEffect, useCallback } from 'react';
import { List } from '@/lib/ui-library/components/List';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2 } from 'lucide-react';
import { Product, mockProducts, fetchProducts, ProductCard } from './shared';

export const InfiniteScrollDemo = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageSize = 8;

  const totalPages = Math.ceil(mockProducts.length / pageSize);
  const currentPage = products.length === 0 ? 0 : Math.ceil(products.length / pageSize);

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
    const data = await fetchProducts(1, pageSize);
    setProducts(data);
    setLoading(false);
  };

  const handleInfiniteScroll = useCallback(async (page: number) => {
    if (isLoadingMore || page > totalPages) {
      return;
    }
    setIsLoadingMore(true);
    const data = await fetchProducts(page, pageSize);
    if (data.length > 0) {
      setProducts(prev => [...prev, ...data]);
    }
    setIsLoadingMore(false);
  }, [isLoadingMore, totalPages, pageSize]);

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
            Showing {products.length} of {mockProducts.length} items (Page {currentPage} of {totalPages})
          </span>
        </div>
        <List
          id="infinite-list"
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
        {isLoadingMore && (
          <div className="flex items-center justify-center py-3 border-t">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">Loading more items...</span>
          </div>
        )}
        {currentPage === totalPages && products.length > 0 && !isLoadingMore && (
          <div className="flex items-center justify-center py-3 border-t text-sm text-muted-foreground">
            All {mockProducts.length} items loaded
          </div>
        )}
      </CardContent>
    </Card>
  );
};
