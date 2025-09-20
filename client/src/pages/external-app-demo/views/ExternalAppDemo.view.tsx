import { useState, useCallback } from 'react';
import { LanguageProvider } from '@/lib/ui-library/TagSelector';
import TagSelector from '@/lib/ui-library/TagSelector';
import type { TagItem } from '@/lib/ui-library/types/language';

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
      </div>

      {/* TagSelector */}
      <TagSelector
        getTagsFunction={getTags}
        selectedTags={selectedTags}
        onSelectionChange={(tags: TagItem[]) => {
          setSelectedTags(tags.map((t: TagItem) => t.id));
        }}
        allowMultiple={true}
        allowAll={true}
      />
    </div>
  );
}

export default function ExternalAppDemo() {
  return (
    <LanguageProvider defaultLanguage="en">
      <ExternalAppContent />
    </LanguageProvider>
  );
}