import { useState } from 'react';
import { FloatingMenu } from '@/lib/ui-library/components/FloatingMenu';
import type { FloatingMenuItem } from '@/lib/ui-library/components/FloatingMenu';
import styles from '../css/FloatingMenuDemo.module.css';

interface LanguageData {
  name: string;
  code: string;
  flag: string;
}

const languageItems: FloatingMenuItem<LanguageData>[] = [
  {
    id: 'pt',
    data: { name: 'Portugués', code: 'pt', flag: '🇧🇷' },
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.data?.flag}</span>
        <span className="font-medium">{item.data?.name}</span>
      </div>
    ),
  },
  {
    id: 'en',
    data: { name: 'Inglés', code: 'en', flag: '🇺🇸' },
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.data?.flag}</span>
        <span className="font-medium">{item.data?.name}</span>
      </div>
    ),
  },
  {
    id: 'es',
    data: { name: 'Español', code: 'es', flag: '🇲🇽' },
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.data?.flag}</span>
        <span className="font-medium">{item.data?.name}</span>
      </div>
    ),
  },
];

export function LanguageSelectorExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageData | null>(null);

  const handleLanguageSelect = (item: FloatingMenuItem<LanguageData>) => {
    setSelectedLanguage(item.data || null);
    setIsOpen(false);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-language-title">Selector de Idioma</h2>
      <p className={styles.sectionDescription}>
        Menú flotante con items personalizados (banderas + texto). Posición por defecto: bottom-start.
      </p>
      <div className={styles.demoArea}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.triggerBtn + ' ' + styles.triggerBtnGray}
            data-testid="button-language-trigger"
          >
            {selectedLanguage ? (
              <>
                <span className="text-xl">{selectedLanguage.flag}</span>
                <span>{selectedLanguage.name}</span>
              </>
            ) : (
              <span>Seleccionar idioma</span>
            )}
            <span>▼</span>
          </button>

          <FloatingMenu
            items={languageItems}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onItemClick={handleLanguageSelect}
            layout={{ widthMode: 'fixed', width: 200 }}
          />
        </div>

        {selectedLanguage && (
          <p className={styles.infoText} data-testid="text-selected-language">
            Idioma seleccionado: <strong>{selectedLanguage.name}</strong> ({selectedLanguage.code})
          </p>
        )}
      </div>
    </div>
  );
}
