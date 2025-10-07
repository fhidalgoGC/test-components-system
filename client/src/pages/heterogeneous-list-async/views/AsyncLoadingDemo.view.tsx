import { useState } from "react";
import { HeterogeneousList } from "@/lib/ui-library/components/HeterogeneousList";
import { Button } from "@/components/ui/button";
import { NotificationItem } from "@/pages/heterogeneous-list-registry/components/NotificationItem";
import { ProductItem } from "@/pages/heterogeneous-list-registry/components/ProductItem";
import { TaskItem } from "@/pages/heterogeneous-list-registry/components/TaskItem";
import { UserItem } from "@/pages/heterogeneous-list-registry/components/UserItem";
import { EventItem } from "@/pages/heterogeneous-list-registry/components/EventItem";
import { MessageItem } from "@/pages/heterogeneous-list-registry/components/MessageItem";
import { CustomLoading } from "../components/CustomLoading";
import { EmptyState } from "../components/EmptyState";
import { Play, Trash2, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Tipos de items
type ItemKind = 'notification' | 'product' | 'task' | 'user' | 'event' | 'message';

interface BaseItem {
  id: number;
  kind: ItemKind;
}

// Registro de componentes
const kindComponent = {
  notification: NotificationItem,
  product: ProductItem,
  task: TaskItem,
  user: UserItem,
  event: EventItem,
  message: MessageItem,
};

// Generador de items de ejemplo
const generateItems = (startId: number, count: number): BaseItem[] => {
  const kinds: ItemKind[] = ['notification', 'product', 'task', 'user', 'event', 'message'];
  return Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    kind: kinds[(startId + i) % kinds.length],
  }));
};

export function AsyncLoadingDemo() {
  const [items, setItems] = useState<BaseItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [loadHistory, setLoadHistory] = useState<string[]>([]);

  const totalItems = 50;
  const itemsPerPage = 10;

  // Loader asíncrono
  const asyncLoader = async (page: number, pageSize: number) => {
    const startId = page * pageSize;
    const remainingItems = totalItems - startId;
    
    if (remainingItems <= 0) {
      return { data: [], hasMore: false };
    }

    setIsLoadingData(true);
    setLoadHistory(prev => [...prev, `Página ${page + 1} solicitada`]);

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1500));

    const itemsToLoad = Math.min(pageSize, remainingItems);
    const newItems = generateItems(startId, itemsToLoad);
    
    setIsLoadingData(false);
    setCurrentPage(page + 1);
    setLoadHistory(prev => [...prev, `Cargados ${itemsToLoad} elementos (total: ${startId + itemsToLoad}/${totalItems})`]);

    return {
      data: newItems,
      hasMore: startId + itemsToLoad < totalItems,
    };
  };

  // Callbacks
  const handleEnd = () => {
    setHasReachedEnd(true);
    setLoadHistory(prev => [...prev, '🎉 Fin de la lista alcanzado']);
  };

  const handleStart = () => {
    setShowEmpty(false);
    setHasReachedEnd(false);
    setItems([]);
    setCurrentPage(0);
    setLoadHistory(['🚀 Iniciando carga...']);
  };

  const handleClear = () => {
    setItems([]);
    setCurrentPage(0);
    setHasReachedEnd(false);
    setLoadHistory(['🗑️ Lista limpiada']);
  };

  const handleShowEmpty = () => {
    setShowEmpty(true);
    setItems([]);
    setCurrentPage(0);
    setHasReachedEnd(false);
    setLoadHistory(['👁️ Mostrando estado vacío']);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Carga Asíncrona - Demo</h1>
        <p className="text-muted-foreground">
          Demostración de carga asíncrona con 50 elementos, paginación de 10 en 10
        </p>
      </div>

      {/* Panel de control */}
      <div className="border rounded-lg p-4 bg-card">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          Panel de Control
          {isLoadingData && <Badge variant="secondary">Cargando...</Badge>}
        </h2>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            onClick={handleStart} 
            size="sm"
            data-testid="button-start-loading"
          >
            <Play className="w-4 h-4 mr-2" />
            Iniciar Carga
          </Button>
          
          <Button 
            onClick={handleClear} 
            variant="outline" 
            size="sm"
            data-testid="button-clear"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Limpiar Lista
          </Button>
          
          <Button 
            onClick={handleShowEmpty} 
            variant="outline" 
            size="sm"
            data-testid="button-show-empty"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Mostrar Vacío
          </Button>
        </div>

        {/* Estado actual */}
        <div className="space-y-2 text-sm">
          <div className="flex gap-4">
            <span className="text-muted-foreground">Elementos cargados:</span>
            <span className="font-medium" data-testid="text-items-count">{items.length}/{totalItems}</span>
          </div>
          <div className="flex gap-4">
            <span className="text-muted-foreground">Página actual:</span>
            <span className="font-medium" data-testid="text-current-page">{currentPage}/{Math.ceil(totalItems / itemsPerPage)}</span>
          </div>
          {hasReachedEnd && (
            <div className="flex gap-4">
              <Badge variant="default" data-testid="badge-end-reached">Fin alcanzado ✓</Badge>
            </div>
          )}
        </div>

        {/* Historial de carga */}
        {loadHistory.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Historial de carga:</h3>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {loadHistory.map((log, i) => (
                <div key={i} className="text-xs text-muted-foreground" data-testid={`log-${i}`}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lista */}
      <div data-testid="list-container">
        <HeterogeneousList
          mode="registry"
          items={items}
          kindComponent={kindComponent}
          dataLoader={asyncLoader}
          pageSize={itemsPerPage}
          onEnd={handleEnd}
          LoadingComponent={CustomLoading}
          EmptyComponent={showEmpty ? EmptyState : undefined}
          infiniteScroll={true}
          preserveScrollPosition={true}
        />
      </div>
    </div>
  );
}
