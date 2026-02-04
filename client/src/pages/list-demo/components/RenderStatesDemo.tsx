import { useState, useEffect } from 'react';
import { List } from '@/lib/ui-library/components/List';
import { useListController } from '@/lib/ui-library/components/List/shared/useListController';
import type { InternalListController, RenderState } from '@/lib/ui-library/components/List/shared/List.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, Package, Inbox } from 'lucide-react';
import { Product, fetchProducts, ProductCard } from './shared';

const IdleComponent = () => (
  <div className="flex items-center justify-center py-8 text-muted-foreground">
    <Package className="w-6 h-6 mr-2" />
    <span>Click a button to change state</span>
  </div>
);

const ErrorComponent = () => (
  <div className="flex items-center justify-center py-8 text-red-500">
    <AlertCircle className="w-6 h-6 mr-2" />
    <span>Error loading data</span>
  </div>
);

const EmptyComponent = () => (
  <div className="flex items-center justify-center py-8 text-muted-foreground">
    <Inbox className="w-6 h-6 mr-2" />
    <span>No items found</span>
  </div>
);

export const RenderStatesDemo = () => {
  const controller = useListController<Product>();
  
  const [currentState, setCurrentState] = useState<RenderState>('renderIdle');

  useEffect(() => {
    const internalController = controller as InternalListController<Product>;
    const updateState = () => {
      setCurrentState(controller.getRenderState());
    };
    updateState();
    return internalController._subscribe(updateState);
  }, [controller]);

  const simulateState = async (state: RenderState) => {
    controller.setRenderState(state);
    
    if (state === 'renderLoading') {
      controller.setData([]);
      await new Promise(resolve => setTimeout(resolve, 1500));
      const data = await fetchProducts(1, 4);
      controller.setData(data);
      controller.setRenderState('renderComplete');
    } else if (state === 'renderComplete') {
      const data = await fetchProducts(1, 4);
      controller.setData(data);
    } else if (state === 'renderEmpty') {
      controller.setData([]);
    } else if (state === 'renderIdle' || state === 'renderError') {
      controller.setData([]);
    }
  };

  return (
    <Card data-testid="card-example3">
      <CardHeader>
        <CardTitle>Example 3: Render States</CardTitle>
        <CardDescription>
          Control explícito de estados: idle, loading, complete, empty, error
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          <Button 
            onClick={() => simulateState('renderIdle')} 
            variant={currentState === 'renderIdle' ? 'default' : 'outline'} 
            size="sm"
            data-testid="button-idle"
          >
            Idle
          </Button>
          <Button 
            onClick={() => simulateState('renderLoading')} 
            variant={currentState === 'renderLoading' ? 'default' : 'outline'} 
            size="sm"
            data-testid="button-loading"
          >
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Loading
          </Button>
          <Button 
            onClick={() => simulateState('renderComplete')} 
            variant={currentState === 'renderComplete' ? 'default' : 'outline'} 
            size="sm"
            data-testid="button-complete"
          >
            Complete
          </Button>
          <Button 
            onClick={() => simulateState('renderEmpty')} 
            variant={currentState === 'renderEmpty' ? 'default' : 'outline'} 
            size="sm"
            data-testid="button-empty"
          >
            <Inbox className="w-4 h-4 mr-2" />
            Empty
          </Button>
          <Button 
            onClick={() => simulateState('renderError')} 
            variant={currentState === 'renderError' ? 'default' : 'outline'} 
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
        <List
          id="states-list"
          controller={controller}
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
          empty={{
            renderType: 'component',
            render: EmptyComponent,
            position: 'center'
          }}
          renderIdle={IdleComponent}
          renderError={ErrorComponent}
          item={{
            renderType: 'component',
            render: (product) => <ProductCard product={product} />
          }}
        />
      </CardContent>
    </Card>
  );
};
