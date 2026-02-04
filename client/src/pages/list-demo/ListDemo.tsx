import { useState, useEffect, useCallback } from 'react';
import { List } from '@/lib/ui-library/components/List';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2, AlertCircle, Package } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const mockProducts: Product[] = [
  { id: 1, name: 'Laptop Pro', price: 1299, category: 'Electronics' },
  { id: 2, name: 'Wireless Mouse', price: 49, category: 'Electronics' },
  { id: 3, name: 'USB-C Hub', price: 79, category: 'Accessories' },
  { id: 4, name: 'Mechanical Keyboard', price: 159, category: 'Electronics' },
  { id: 5, name: 'Monitor 27"', price: 399, category: 'Electronics' },
  { id: 6, name: 'Webcam HD', price: 89, category: 'Electronics' },
  { id: 7, name: 'Desk Lamp', price: 45, category: 'Office' },
  { id: 8, name: 'Notebook Set', price: 25, category: 'Office' },
];

const fetchProducts = async (page: number, pageSize: number): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const start = (page - 1) * pageSize;
  return mockProducts.slice(start, start + pageSize);
};

const ProductCard = ({ product }: { product: Product }) => (
  <div className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-gray-800 mb-2 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
        <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white">{product.name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
      </div>
    </div>
    <span className="text-lg font-semibold text-green-600 dark:text-green-400">
      ${product.price}
    </span>
  </div>
);

const Example1BasicList = () => {
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
            height: 300
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

const Example2InfiniteScroll = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageSize = 3;

  const currentPage = Math.ceil(products.length / pageSize) || 1;
  const maxPages = Math.ceil(mockProducts.length / pageSize);

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
    if (isLoadingMore || page > maxPages) {
      return;
    }
    setIsLoadingMore(true);
    const data = await fetchProducts(page, pageSize);
    if (data.length > 0) {
      setProducts(prev => [...prev, ...data]);
    }
    setIsLoadingMore(false);
  }, [isLoadingMore, maxPages, pageSize]);

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
            Showing {products.length} of {mockProducts.length} items (Page {currentPage})
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
      </CardContent>
    </Card>
  );
};

const Example3RenderStates = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentState, setCurrentState] = useState<'idle' | 'loading' | 'complete' | 'error'>('idle');

  const simulateState = async (state: 'idle' | 'loading' | 'complete' | 'error') => {
    setCurrentState(state);
    
    if (state === 'loading') {
      setProducts([]);
      await new Promise(resolve => setTimeout(resolve, 1500));
      const data = await fetchProducts(1, 4);
      setProducts(data);
      setCurrentState('complete');
    } else if (state === 'complete') {
      const data = await fetchProducts(1, 4);
      setProducts(data);
    } else if (state === 'idle' || state === 'error') {
      setProducts([]);
    }
  };

  const renderStateContent = () => {
    if (currentState === 'loading') {
      return (
        <div className="flex items-center justify-center py-8 h-[200px]">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading...</span>
        </div>
      );
    }
    if (currentState === 'idle') {
      return (
        <div className="flex items-center justify-center py-8 h-[200px] text-muted-foreground">
          <Package className="w-6 h-6 mr-2" />
          <span>Click a button to change state</span>
        </div>
      );
    }
    if (currentState === 'error') {
      return (
        <div className="flex items-center justify-center py-8 h-[200px] text-red-500">
          <AlertCircle className="w-6 h-6 mr-2" />
          <span>Error loading data</span>
        </div>
      );
    }
    return (
      <List
        id="states-list"
        layout={{
          widthMode: 'full',
          heightMode: 'fixed',
          height: 200
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
    );
  };

  return (
    <Card data-testid="card-example3">
      <CardHeader>
        <CardTitle>Example 3: Render States</CardTitle>
        <CardDescription>
          Control explícito de estados: idle, loading, complete, error
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          <Button 
            onClick={() => simulateState('idle')} 
            variant={currentState === 'idle' ? 'default' : 'outline'} 
            size="sm"
            data-testid="button-idle"
          >
            Idle
          </Button>
          <Button 
            onClick={() => simulateState('loading')} 
            variant={currentState === 'loading' ? 'default' : 'outline'} 
            size="sm"
            data-testid="button-loading"
          >
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Loading
          </Button>
          <Button 
            onClick={() => simulateState('complete')} 
            variant={currentState === 'complete' ? 'default' : 'outline'} 
            size="sm"
            data-testid="button-complete"
          >
            Complete
          </Button>
          <Button 
            onClick={() => simulateState('error')} 
            variant={currentState === 'error' ? 'default' : 'outline'} 
            size="sm"
            data-testid="button-error"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Error
          </Button>
        </div>
        <div className="mb-2 text-sm">
          Current State: <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">{currentState}</code>
        </div>
        {renderStateContent()}
      </CardContent>
    </Card>
  );
};

const Example4CustomLoading = () => {
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
            minHeight: 150
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

const ListDemo = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">List Component</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Componente agnóstico con control externo del ciclo de render mediante useListController.
          El List no interpreta ni obtiene data - solo renderiza lo que recibe.
        </p>
      </div>

      <Example1BasicList />
      <Example2InfiniteScroll />
      <Example3RenderStates />
      <Example4CustomLoading />
    </div>
  );
};

export default ListDemo;
