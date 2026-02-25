import { useState } from 'react';
import { FloatingMenu } from '@/lib/ui-library/components/FloatingMenu';
import type { FloatingMenuItem } from '@/lib/ui-library/components/FloatingMenu';
import styles from '../css/FloatingMenuDemo.module.css';

const initialItems: FloatingMenuItem<{ name: string; emoji: string }>[] = [
  {
    id: 'task-1',
    data: { name: 'Diseñar interfaz', emoji: '🎨' },
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="text-xl">{item.data?.emoji}</span>
        <span className="font-medium text-sm">{item.data?.name}</span>
      </div>
    ),
  },
  {
    id: 'task-2',
    data: { name: 'Revisar código', emoji: '🔍' },
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="text-xl">{item.data?.emoji}</span>
        <span className="font-medium text-sm">{item.data?.name}</span>
      </div>
    ),
  },
  {
    id: 'task-3',
    data: { name: 'Escribir tests', emoji: '🧪' },
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="text-xl">{item.data?.emoji}</span>
        <span className="font-medium text-sm">{item.data?.name}</span>
      </div>
    ),
  },
  {
    id: 'task-4',
    data: { name: 'Deploy a producción', emoji: '🚀' },
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="text-xl">{item.data?.emoji}</span>
        <span className="font-medium text-sm">{item.data?.name}</span>
      </div>
    ),
  },
  {
    id: 'task-5',
    data: { name: 'Documentar API', emoji: '📝' },
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="text-xl">{item.data?.emoji}</span>
        <span className="font-medium text-sm">{item.data?.name}</span>
      </div>
    ),
  },
];

export function OrderableExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(initialItems);
  const [currentOrder, setCurrentOrder] = useState<string | null>(null);

  const handleOrderChange = (newItems: FloatingMenuItem<{ name: string; emoji: string }>[]) => {
    setItems(newItems);
    const names = newItems.map((i) => `${i.data?.emoji} ${i.data?.name}`).join('\n');
    setCurrentOrder(names);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-orderable-title">Reordenable (orderable)</h2>
      <p className={styles.sectionDescription}>
        Con <code className={styles.sectionDescriptionCode}>orderable=true</code>, los items se pueden reordenar
        arrastrando con el icono de grip. El callback <code className={styles.sectionDescriptionCode}>onOrderChange</code> recibe
        el nuevo array de items tras cada reordenamiento.
      </p>
      <div className={styles.demoArea}>
        <div className={styles.row}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={styles.triggerBtn + ' ' + styles.triggerBtnPurple}
              data-testid="button-orderable-trigger"
            >
              Abrir (orderable)
            </button>

            <FloatingMenu
              items={items}
              isOpen={isOpen}
              orderable={true}
              onOrderChange={handleOrderChange}
              onClose={() => setIsOpen(false)}
              layout={{ widthMode: 'fixed', width: 260 }}
            />
          </div>

          <button
            onClick={() => {
              setItems(initialItems);
              setCurrentOrder(null);
            }}
            className={styles.clearBtn}
            data-testid="button-reset-order"
          >
            Resetear orden
          </button>
        </div>

        {currentOrder && (
          <div style={{ marginTop: 12 }}>
            <p className={styles.infoText} data-testid="text-order-title">
              <strong>Orden actual (todos los items):</strong>
            </p>
            <pre
              style={{
                marginTop: 8,
                padding: 12,
                background: '#f9fafb',
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                fontSize: 13,
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
              }}
              data-testid="text-order-result"
            >
              {currentOrder}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
