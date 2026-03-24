import { useState, useEffect } from 'react';
import { List } from '@/lib/ui-library/components/List';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Product, fetchProducts, ProductCard } from './shared';

export const CustomLoadingDemo = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const CustomLoadingComponent = () => (
    <div className="flex flex-col items-center justify-center py-8 gap-2">
      <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
      <span className="text-purple-600 font-medium">Loading products...</span>
    </div>
  );

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const data = await fetchProducts(1, 3);
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleReload = async () => {
    setLoading(true);
    setProducts([]);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const data = await fetchProducts(1, 3);
    setProducts(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <Card data-testid="card-example4">
        <CardHeader>
          <CardTitle>Example 4: Custom Loading Component</CardTitle>
          <CardDescription>
            Loading indicator personalizado con un componente custom.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomLoadingComponent />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="card-example4">
      <CardHeader>
        <CardTitle>Example 4: Custom Loading Component</CardTitle>
        <CardDescription>
          Loading indicator personalizado con un componente custom.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button onClick={handleReload} variant="outline" size="sm" data-testid="button-reload-example4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload with Custom Loading
          </Button>
        </div>
        <List
          id="custom-loading-list"
          layout={{
            widthMode: 'full',
            heightMode: 'auto',
            minHeight: 150,
            gap: 8
          }}
          behaviors={{
            scroll: 'none'
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
