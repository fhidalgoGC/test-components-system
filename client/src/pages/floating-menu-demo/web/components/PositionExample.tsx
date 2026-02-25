import { useState } from 'react';
import { FloatingMenu } from '@/lib/ui-library/components/FloatingMenu';
import type { FloatingMenuItem, MenuPosition } from '@/lib/ui-library/components/FloatingMenu';
import styles from '../css/FloatingMenuDemo.module.css';

const languageItems: FloatingMenuItem<{ name: string; flag: string }>[] = [
  {
    id: 'pt',
    data: { name: 'Portugués', flag: '🇧🇷' },
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.data?.flag}</span>
        <span className="font-medium">{item.data?.name}</span>
      </div>
    ),
  },
  {
    id: 'en',
    data: { name: 'Inglés', flag: '🇺🇸' },
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.data?.flag}</span>
        <span className="font-medium">{item.data?.name}</span>
      </div>
    ),
  },
  {
    id: 'es',
    data: { name: 'Español', flag: '🇲🇽' },
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.data?.flag}</span>
        <span className="font-medium">{item.data?.name}</span>
      </div>
    ),
  },
];

const positionOptions: MenuPosition[] = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end',
];

export function PositionExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<MenuPosition>('bottom-start');

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-position-title">Posición del Menú</h2>
      <p className={styles.sectionDescription}>
        Prueba las diferentes posiciones de apertura del menú.
      </p>
      <div className={styles.demoArea}>
        <div className={styles.positionGrid}>
          {positionOptions.map((pos) => (
            <button
              key={pos}
              onClick={() => setSelectedPosition(pos)}
              className={`${styles.positionBtn} ${selectedPosition === pos ? styles.positionBtnActive : ''}`}
              data-testid={`button-position-${pos}`}
            >
              {pos}
            </button>
          ))}
        </div>

        <div className={styles.positionCenter}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={styles.triggerBtn + ' ' + styles.triggerBtnGreen}
              data-testid="button-position-trigger"
            >
              Abrir ({selectedPosition})
            </button>

            <FloatingMenu
              items={languageItems}
              isOpen={isOpen}
              position={selectedPosition}
              onClose={() => setIsOpen(false)}
              onItemClick={() => setIsOpen(false)}
              layout={{ widthMode: 'fixed', width: 180 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
