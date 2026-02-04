import { useState } from 'react';
import { List } from '@/lib/ui-library/components/List';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, Package } from 'lucide-react';
import { Product, fetchProducts, ProductCard } from './shared';

export const RenderStatesDemo = () => {
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
