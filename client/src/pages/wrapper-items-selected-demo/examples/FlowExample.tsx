import { useState } from 'react';
import { WrapperItemsSelected, useSelection } from '@/lib/ui-library/components/WrapperItemsSelected';
import { Card, CardContent } from '@/components/ui/card';

// 🎴 Cada Card solo conoce SU propio ID
const SimpleCard = ({ id, title }: { id: string; title: string }) => {
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(id);

  return (
    <Card
      onClick={() => {
        // ⚡ El card solo avisa: "Yo soy el ID 'X', cambia mi estado"
        toggleSelection(id); // Solo pasa SU ID
        console.log(`Card ${id} clicked!`);
      }}
      className={`cursor-pointer transition-all ${
        selected 
          ? 'ring-4 ring-blue-500 bg-blue-50 dark:bg-blue-900' 
          : 'hover:ring-2 hover:ring-gray-300'
      }`}
      data-testid={`card-${id}`}
    >
      <CardContent className="p-6 text-center">
        <div className="text-lg font-bold mb-2">{title}</div>
        <div className="text-sm text-muted-foreground">ID: {id}</div>
        {selected && (
          <div className="mt-2 text-2xl text-blue-600 dark:text-blue-400">
            ✓ Seleccionado
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// 📊 Panel que muestra el estado completo
const StatePanel = () => {
  const { selectedIds } = useSelection();
  
  return (
    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
      <h3 className="font-bold mb-2 text-foreground">📦 Estado del Wrapper:</h3>
      <div className="space-y-2">
        <div className="text-sm">
          <span className="font-semibold">Total seleccionados:</span>{' '}
          <span className="text-blue-600 dark:text-blue-400 font-bold">
            {selectedIds.length}
          </span>
        </div>
        <div className="text-sm">
          <span className="font-semibold">IDs seleccionados:</span>
          <code className="ml-2 bg-white dark:bg-slate-900 px-2 py-1 rounded text-xs">
            {selectedIds.length > 0 ? JSON.stringify(selectedIds) : '[]'}
          </code>
        </div>
      </div>
    </div>
  );
};

export const FlowExample = () => {
  const [log, setLog] = useState<string[]>([]);

  const cards = [
    { id: 'card-1', title: 'Card 1' },
    { id: 'card-2', title: 'Card 2' },
    { id: 'card-3', title: 'Card 3' },
    { id: 'card-4', title: 'Card 4' },
    { id: 'card-5', title: 'Card 5' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800">
        <h3 className="font-bold text-lg mb-2 text-foreground">🔄 Cómo Funciona:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-foreground">
          <li>Cada card llama <code className="bg-white dark:bg-slate-900 px-1 rounded">toggleSelection(id)</code> con SU propio ID</li>
          <li>El Wrapper recibe el ID y actualiza el array completo</li>
          <li>El Wrapper notifica a TODOS los cards del nuevo estado</li>
          <li>Cada card verifica si está en el array con <code className="bg-white dark:bg-slate-900 px-1 rounded">isSelected(id)</code></li>
        </ol>
      </div>

      <WrapperItemsSelected
        multiSelect={true}
        defaultSelectedIds={['card-2']}
        onSelectionChange={(selectedIds) => {
          // 📣 El wrapper te da el array COMPLETO de todos los seleccionados
          const message = `✅ Selección actualizada: [${selectedIds.join(', ')}]`;
          setLog(prev => [...prev.slice(-4), message]);
          console.log(message);
        }}
        onItemAction={(event) => {
          // 📣 También te avisa de cada acción individual
          const message = `🔔 Card "${event.id}" fue ${event.action === 'selected' ? '✓ seleccionado' : '✗ deseleccionado'}`;
          setLog(prev => [...prev.slice(-4), message]);
          console.log(message);
        }}
      >
        {/* Panel de estado - se actualiza automáticamente */}
        <StatePanel />

        {/* 5 Cards - cada uno solo conoce SU ID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {cards.map((card) => (
            <SimpleCard key={card.id} {...card} />
          ))}
        </div>
      </WrapperItemsSelected>

      {/* Log de eventos */}
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
        <h3 className="font-bold mb-2 text-foreground">📝 Log de Eventos:</h3>
        <div className="space-y-1 font-mono text-xs">
          {log.length === 0 ? (
            <p className="text-muted-foreground">Haz click en las cards para ver eventos...</p>
          ) : (
            log.map((entry, i) => (
              <div key={i} className="text-foreground">{entry}</div>
            ))
          )}
        </div>
      </div>

      {/* Explicación visual */}
      <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border-2 border-green-200 dark:border-green-800">
        <h3 className="font-bold mb-2 text-foreground">💡 Punto Clave:</h3>
        <p className="text-sm text-foreground">
          <strong>Cada card NO necesita saber sobre los demás.</strong> Solo llama{' '}
          <code className="bg-white dark:bg-slate-900 px-1 rounded">toggleSelection('mi-id')</code>{' '}
          y el Wrapper se encarga de:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-foreground ml-4">
          <li>Mantener el array de TODOS los IDs seleccionados</li>
          <li>Notificar a los callbacks con el array completo</li>
          <li>Actualizar a TODOS los cards automáticamente vía Context</li>
        </ul>
      </div>
    </div>
  );
};
