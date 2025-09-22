import { useState, useCallback } from 'react';
import { AppLanguageProvider, useAppLanguage } from '../../../providers/AppLanguageProvider';
import { LibI18nProvider } from '../../../lib/ui-library/providers/LibI18nProvider';
import TagSelector from '@/lib/ui-library/TagSelector';
import type { TagItem } from '@/lib/ui-library/types/language';

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
      <div>
        <h1 className="text-2xl font-bold mb-4">External App Demo</h1>
        <p className="text-gray-600 mb-4">
          Demostrando la sincronización automática de idiomas entre la app padre (AppLanguageProvider) 
          y la librería hijo (LibI18nProvider).
        </p>
        
        {/* Botones para cambiar idioma desde la app padre */}
        <LanguageSwitcher />
      </div>

      {/* La librería "detecta" el provider padre y se sincroniza automáticamente */}
      <LibI18nProvider>
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