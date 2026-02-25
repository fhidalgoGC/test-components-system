import { useState } from 'react';
import { FloatingMenu } from '@/lib/ui-library/components/FloatingMenu';
import type { FloatingMenuItem } from '@/lib/ui-library/components/FloatingMenu';
import styles from '../css/FloatingMenuDemo.module.css';

const manyItems: FloatingMenuItem<{ label: string }>[] = Array.from({ length: 8 }, (_, i) => ({
  id: `item-${i + 1}`,
  data: { label: `Item ${i + 1}` },
  render: (item) => (
    <div className="flex items-center gap-2">
      <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600">
        {i + 1}
      </span>
      <span>{item.data?.label}</span>
    </div>
  ),
}));

export function SectionsExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-sections-title">Header, Body y Footer</h2>
      <p className={styles.sectionDescription}>
        Menú con secciones personalizables. Puedes mostrar/ocultar header y footer.
      </p>
      <div className={styles.demoArea}>
        <div className={styles.checkboxRow}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={showHeader}
              onChange={(e) => setShowHeader(e.target.checked)}
              data-testid="checkbox-show-header"
            />
            Show Header
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={showFooter}
              onChange={(e) => setShowFooter(e.target.checked)}
              data-testid="checkbox-show-footer"
            />
            Show Footer
          </label>
        </div>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.triggerBtn + ' ' + styles.triggerBtnPurple}
            data-testid="button-sections-trigger"
          >
            Abrir menú con secciones
          </button>

          <FloatingMenu
            items={manyItems}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onItemClick={(item) => {
              console.log('Clicked:', item.data?.label);
              setIsOpen(false);
            }}
            header={{
              renderType: 'component',
              show: showHeader,
              heightMode: 'auto',
              render: () => (
                <div className="p-3 bg-gray-50">
                  <h3 className="font-semibold text-sm">Seleccionar opción</h3>
                  <p className="text-xs text-gray-500">Elige una de las siguientes</p>
                </div>
              ),
            }}
            footer={{
              renderType: 'component',
              show: showFooter,
              heightMode: 'fixed',
              height: 50,
              render: () => (
                <div className="p-3 bg-gray-50 h-full flex items-center justify-between">
                  <span className="text-xs text-gray-500">8 opciones disponibles</span>
                  <button
                    className="text-xs text-blue-500 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              ),
            }}
            layout={{ widthMode: 'fixed', width: 280, maxHeight: 350 }}
          />
        </div>
      </div>
    </div>
  );
}
