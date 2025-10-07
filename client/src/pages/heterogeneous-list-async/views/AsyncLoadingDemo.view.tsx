import { useState } from "react";
import { HeterogeneousList } from "@/lib/ui-library/components/HeterogeneousList";
import { Button } from "@/components/ui/button";
import { NotificationCard } from "@/pages/heterogeneous-list-registry/components/NotificationCard";
import { ProductCard } from "@/pages/heterogeneous-list-registry/components/ProductCard";
import { TaskCard } from "@/pages/heterogeneous-list-registry/components/TaskCard";
import { UserCard } from "@/pages/heterogeneous-list-registry/components/UserCard";
import { EventCard } from "@/pages/heterogeneous-list-registry/components/EventCard";
import { MessageCard } from "@/pages/heterogeneous-list-registry/components/MessageCard";
import { CustomLoading } from "../components/CustomLoading";
import { EmptyState } from "../components/EmptyState";
import { Play, Trash2, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Tipos de items
type ItemKind = 'notification' | 'product' | 'task' | 'user' | 'event' | 'message';

interface BaseItem {
  id: number;
  kindComponent: ItemKind;
}

// Registro de componentes
const componentRegistry = {
  notification: NotificationCard,
  product: ProductCard,
  task: TaskCard,
  user: UserCard,
  event: EventCard,
  message: MessageCard,
};

// Generador de items de ejemplo con datos completos
const generateItems = (startId: number, count: number): BaseItem[] => {
  const kinds: ItemKind[] = ['notification', 'product', 'task', 'user', 'event', 'message'];
  
  return Array.from({ length: count }, (_, i) => {
    const itemId = startId + i;
    const kind = kinds[itemId % kinds.length];
    
    const baseItem: any = {
      id: itemId,
      kindComponent: kind,
    };

    // Agregar datos específicos según el tipo
    switch (kind) {
      case 'notification':
        return {
          ...baseItem,
          title: `Notificación ${itemId + 1}`,
          message: `Este es el mensaje de la notificación número ${itemId + 1}`,
          time: 'Hace 5 min',
        };
      case 'product':
        return {
          ...baseItem,
          name: `Producto ${itemId + 1}`,
          price: Math.floor(Math.random() * 1000) + 50,
          category: ['Electrónica', 'Ropa', 'Hogar', 'Deportes'][itemId % 4],
        };
      case 'task':
        return {
          ...baseItem,
          title: `Tarea ${itemId + 1}`,
          status: itemId % 3 === 0 ? 'completed' : 'pending',
          priority: itemId % 4 === 0 ? 'high' : 'normal',
        };
      case 'user':
        return {
          ...baseItem,
          name: `Usuario ${itemId + 1}`,
          email: `usuario${itemId + 1}@example.com`,
          role: ['Admin', 'Editor', 'Viewer'][itemId % 3],
        };
      case 'event':
        return {
          ...baseItem,
          name: `Evento ${itemId + 1}`,
          date: '15 Nov 2024',
          location: `Sala ${String.fromCharCode(65 + (itemId % 5))}`,
        };
      case 'message':
        return {
          ...baseItem,
          sender: `Usuario ${itemId + 1}`,
          content: `Este es el contenido del mensaje número ${itemId + 1}`,
          timestamp: 'Hace 2h',
          unread: itemId % 5 === 0,
        };
      default:
        return baseItem;
    }
  });
};

export function AsyncLoadingDemo() {
  const [items, setItems] = useState<BaseItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [loadHistory, setLoadHistory] = useState<string[]>([]);
  const [enableLoader, setEnableLoader] = useState(false);

  const totalItems = 50;
  const itemsPerPage = 10;

  // Loader asíncrono
  const asyncLoader = async ({ page, limit }: { page: number; limit: number }) => {
    const startId = page * limit;
    const remainingItems = totalItems - startId;
    
    if (remainingItems <= 0) {
      return { items: [], hasMore: false };
    }

    setIsLoadingData(true);
    setLoadHistory(prev => [...prev, `Página ${page + 1} solicitada`]);

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1500));

    const itemsToLoad = Math.min(limit, remainingItems);
    const newItems = generateItems(startId, itemsToLoad);
    
    setIsLoadingData(false);
    setCurrentPage(page + 1);
    setLoadHistory(prev => [...prev, `Cargados ${itemsToLoad} elementos (total: ${startId + itemsToLoad}/${totalItems})`]);

    return {
      items: newItems,
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
    setEnableLoader(true);
    setLoadHistory(['🚀 Iniciando carga...']);
  };

  const handleClear = () => {
    setItems([]);
    setCurrentPage(0);
    setHasReachedEnd(false);
    setEnableLoader(false);
    setLoadHistory(['🗑️ Lista limpiada']);
  };

  const handleShowEmpty = () => {
    setShowEmpty(true);
    setItems([]);
    setCurrentPage(0);
    setHasReachedEnd(false);
    setEnableLoader(false);
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
          registry={componentRegistry}
          dataLoader={enableLoader ? asyncLoader : undefined}
          pageSize={itemsPerPage}
          onEnd={handleEnd}
          loading={<CustomLoading />}
          empty={showEmpty ? <EmptyState /> : undefined}
          infiniteScroll={true}
          preserveScrollPosition={true}
          gap={16}
          dividerVariant="line"
        />
      </div>
    </div>
  );
}
