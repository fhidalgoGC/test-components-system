import { useState, useEffect } from 'react';
import { List } from '@/lib/ui-library/components/List';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2 } from 'lucide-react';
import { Product, fetchProducts, ProductCard } from './shared';

export const BasicListDemo = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts(1, 4);
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleReload = async () => {
    setLoading(true);
    setProducts([]);
    const data = await fetchProducts(1, 4);
    setProducts(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <Card data-testid="card-example1">
        <CardHeader>
          <CardTitle>Example 1: Basic List with Controller</CardTitle>
          <CardDescription>
            Lista con controller interno. Los datos se pasan via prop data y el List los renderiza.
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
    <Card data-testid="card-example1">
      <CardHeader>
        <CardTitle>Example 1: Basic List with Controller</CardTitle>
        <CardDescription>
          Lista con controller interno. Los datos se pasan via prop data y el List los renderiza.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button onClick={handleReload} variant="outline" size="sm" data-testid="button-reload-example1">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload Data
          </Button>
        </div>
        <List
          id="basic-list"
          layout={{
            widthMode: 'full',
            heightMode: 'fixed',
            height: 300,
            gap: 8
          }}
          behaviors={{
            scroll: 'normal'
          }}
          loading={{
            renderType: 'self',
            position: 'over'
          }}
          data={products}
          item={{
            renderType: 'component',
            render: (product) => <ProductCard product={product} />
          }}
        />
      </CardContent>
    </Card>
  );
};
