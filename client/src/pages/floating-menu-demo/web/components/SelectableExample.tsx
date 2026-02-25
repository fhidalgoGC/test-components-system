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

export function SelectableExample() {
  const [isOpen, setIsOpen] = useState(false);
  const controller = useFloatingMenu();
  const [selectionInfo, setSelectionInfo] = useState<string | null>(null);

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-selectable-title">Selección Interna (selectable)</h2>
      <p className={styles.sectionDescription}>
        Con <code className={styles.sectionDescriptionCode}>selectable=true</code>, el menú marca visualmente el item seleccionado.
        Usa <code className={styles.sectionDescriptionCode}>useFloatingMenu()</code> para obtener el controller y limpiar la selección.
      </p>
      <div className={styles.demoArea}>
        <div className={styles.row}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={styles.triggerBtn + ' ' + styles.triggerBtnIndigo}
              data-testid="button-selectable-trigger"
            >
              Abrir (selectable)
            </button>

            <FloatingMenu
              items={languageItems}
              isOpen={isOpen}
              selectable={true}
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
            data-testid="button-clear-selection"
          >
            Limpiar selección
          </button>
        </div>

        {selectionInfo ? (
          <p className={styles.infoText} data-testid="text-selection-info">
            Item seleccionado internamente: <strong>{selectionInfo}</strong>
          </p>
        ) : (
          <p className={styles.infoTextMuted}>Ningún item seleccionado</p>
        )}
      </div>
    </div>
  );
}
