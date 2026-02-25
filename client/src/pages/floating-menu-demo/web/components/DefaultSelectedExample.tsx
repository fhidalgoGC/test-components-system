import { useState } from 'react';
import { FloatingMenu, useFloatingMenu } from '@/lib/ui-library/components/FloatingMenu';
import type { FloatingMenuItem } from '@/lib/ui-library/components/FloatingMenu';
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

export function DefaultSelectedExample() {
  const [isOpen, setIsOpen] = useState(false);
  const controller = useFloatingMenu();
  const [selectionInfo, setSelectionInfo] = useState<string | null>('es');

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-default-selected-title">Selección con defaultSelectedId</h2>
      <p className={styles.sectionDescription}>
        Con <code className={styles.sectionDescriptionCode}>defaultSelectedId="es"</code>, el menú inicia con "Español" ya seleccionado.
      </p>
      <div className={styles.demoArea}>
        <div className={styles.row}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={styles.triggerBtn + ' ' + styles.triggerBtnTeal}
              data-testid="button-default-selected-trigger"
            >
              Abrir (default: Español)
            </button>

            <FloatingMenu
              items={languageItems}
              isOpen={isOpen}
              selectable={true}
              defaultSelectedId="es"
              controller={controller}
              onClose={() => setIsOpen(false)}
              onSelectionChange={(id) => setSelectionInfo(id)}
              onItemClick={() => setIsOpen(false)}
              layout={{ widthMode: 'fixed', width: 220 }}
            />
          </div>

          <button
            onClick={() => {
              controller.clearSelection();
              setSelectionInfo(null);
            }}
            className={styles.clearBtn}
            data-testid="button-clear-default-selection"
          >
            Resetear selección
          </button>
        </div>

        <p className={styles.infoText} data-testid="text-default-selection-info">
          Item seleccionado: <strong>{selectionInfo ?? 'ninguno'}</strong>
        </p>
      </div>
    </div>
  );
}
