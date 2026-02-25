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
  const [orderLog, setOrderLog] = useState<string[]>([]);

  const handleOrderChange = (newItems: FloatingMenuItem<{ name: string; emoji: string }>[]) => {
    setItems(newItems);
    const names = newItems.map((i) => i.data?.name).join(' → ');
    setOrderLog((prev) => [...prev.slice(-2), names]);
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
              setOrderLog([]);
            }}
            className={styles.clearBtn}
            data-testid="button-reset-order"
          >
            Resetear orden
          </button>
        </div>

        {orderLog.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <p className={styles.infoText} data-testid="text-order-log-title">
              <strong>Último orden:</strong>
            </p>
            {orderLog.map((log, i) => (
              <p key={i} className={styles.infoText} data-testid={`text-order-log-${i}`}>
                {log}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
