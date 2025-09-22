import { useState, useCallback } from 'react';
import { AppLanguageProvider, useAppLanguage } from '../../../providers/AppLanguageProvider';
import { LibI18nProvider } from '../../../lib/ui-library/providers/LibI18nProvider';
import TagSelector from '@/lib/ui-library/TagSelector';
import type { TagItem } from '@/lib/ui-library/types/language';
import { globalTranslations } from '../../../i18n';

function LanguageSwitcher() {
  const app = useAppLanguage();
  if (!app) return null;
  
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
      <button 
        onClick={() => app.setLang('es')}
        style={{
          padding: '8px 16px',
          backgroundColor: app.lang === 'es' ? '#007bff' : '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ES
      </button>
      <button 
        onClick={() => app.setLang('en')}
        style={{
          padding: '8px 16px',
          backgroundColor: app.lang === 'en' ? '#007bff' : '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        EN
      </button>
      <span>Idioma actual (app): {app.lang}</span>
    </div>
  );
}

function ExternalAppContent() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [translationPriority, setTranslationPriority] = useState<'component-first' | 'external-first'>('component-first');
  const app = useAppLanguage(); // Obtener el proveedor padre para inyectarlo
  
  // Guard para asegurar que app esté disponible
  if (!app) {
    return <div>Loading app context...</div>;
  }
  
  // Usar las traducciones globales del sistema (es.json, en.json)
  const globalTranslationFiles = [
    { lang: 'es' as const, translations: globalTranslations.es },
    { lang: 'en' as const, translations: globalTranslations.en }
  ];

  // Función async para cargar tags
  const getTags = useCallback(async (): Promise<TagItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 'react',
        label: {
          en: 'React',
          es: 'React',
          fr: 'React',
          default: 'React'
        }
      },
      {
        id: 'typescript',
        label: {
          en: 'TypeScript',
          es: 'TypeScript', 
          fr: 'TypeScript',
          default: 'TypeScript'
        }
      },
      {
        id: 'nodejs',
        label: {
          en: 'Node.js',
          es: 'Node.js',
          fr: 'Node.js', 
          default: 'Node.js'
        }
      },
      {
        id: 'design',
        label: {
          en: 'UI/UX Design',
          es: 'Diseño UI/UX',
          fr: 'Design UI/UX',
          default: 'UI/UX Design'
        }
      }
    ];
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">🌐 App Padre (Externa)</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Este componente simula una aplicación externa que tiene su propio sistema de idioma y traducciones personalizadas.
        </p>
        
        {/* Mostrar estado del idioma */}
        <div className="mb-3 text-sm">
          <strong>Idioma actual:</strong> {app.lang === 'es' ? '🇪🇸 Español' : '🇺🇸 Inglés'}
        </div>
        
        {/* Botones para cambiar idioma desde la app padre */}
        <LanguageSwitcher />
        
        {/* Control de prioridad de traducciones */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">
            📋 Prioridad de Traducciones:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setTranslationPriority('component-first')}
              className={`px-3 py-1 text-xs rounded ${
                translationPriority === 'component-first'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              data-testid="button-priority-component"
            >
              Componente Primero
            </button>
            <button
              onClick={() => setTranslationPriority('external-first')}
              className={`px-3 py-1 text-xs rounded ${
                translationPriority === 'external-first'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              data-testid="button-priority-external"
            >
              Externa Primero
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {translationPriority === 'component-first' 
              ? 'Las traducciones del componente tienen prioridad sobre las externas'
              : 'Las traducciones externas tienen prioridad sobre las del componente'
            }
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-4">External App Demo</h1>
        <p className="text-gray-600 mb-4">
          Demostrando la integración de traducciones jerárquicas usando archivos JSON globales (es.json, en.json) 
          con componentes locales y prioridad configurable.
        </p>
      </div>

      {/* La librería recibe el proveedor padre como prop - completamente portable */}
      <LibI18nProvider 
        parentLanguageProvider={app}
        globalTranslations={globalTranslationFiles}
        translationPriority={translationPriority}
      >
        <TagSelector
          getTagsFunction={getTags}
          selectedTags={selectedTags}
          onSelectionChange={(tags: TagItem[]) => {
            setSelectedTags(tags.map((t: TagItem) => t.id));
          }}
          allowMultiple={true}
          allowAll={true}
          allLabel={{
            en: 'All',
            es: 'Todos',
            fr: 'Tous',
            default: 'All'
          }}
          defaultLabel={{
            en: 'Select tags',
            es: 'Seleccionar etiquetas',
            fr: 'Sélectionner des étiquettes',
            default: 'Select tags'
          }}
        />
      </LibI18nProvider>

      <div className="mt-4 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Selected Tags:</h3>
        <p>{selectedTags.length > 0 ? selectedTags.join(', ') : 'None'}</p>
      </div>
    </div>
  );
}

export default function ExternalAppDemo() {
  return (
    <AppLanguageProvider initial="en">
      <ExternalAppContent />
    </AppLanguageProvider>
  );
}