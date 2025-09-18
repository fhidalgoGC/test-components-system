import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function ReactDoc() {
  const importStatement = `import TagSelector, { LanguageProvider, useLanguage } from '@/lib/ui-library/TagSelector';
import type { Tag, TagItem, TagsFunction, SelectedTagItem } from '@/lib/ui-library/TagSelector/types';
import type { MultiLanguageLabel } from '@/lib/ui-library/types/language';`;
  
  const basicExample = `// New async function approach with new callback format
export function AsyncTagSelector() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const getTagsFromAPI = useCallback(async (): Promise<TagItem[]> => {
    const response = await fetch('/api/categories');
    return response.json();
  }, []);

  // NEW: Callback receives SelectedTagItem[] with {id, language}
  const handleSelectionChange = (items: SelectedTagItem[]) => {
    // Extract IDs for backward compatibility with existing state
    const ids = items.map(item => item.id);
    setSelectedTags(ids);
    
    // Full data available: items contains {id, language} objects
    console.log('Selected items with language:', items);
  };

  return (
    <LanguageProvider defaultLanguage="en">
      <TagSelector
        getTagsFunction={getTagsFromAPI}
        selectedTags={selectedTags}
        onSelectionChange={handleSelectionChange}
        useNewSelectionFormat={true} // Opt-in to new {id, language}[] format
        allowMultiple={true}
        allowAll={true}
        allLabel={{en: "All Categories", es: "Todas las Categorías", default: "All Categories"}}
        defaultLabel={{en: "Default", es: "Por Defecto", default: "Default"}}
      />
    </LanguageProvider>
  );
}`;

  const advancedExample = `export function MultiLanguageTagSelector() {
  const [selectedTags, setSelectedTags] = useState<string[]>(['frontend']);
  const { currentLanguage, setLanguage } = useLanguage();

  // NEW: Handle the updated callback format
  const handleSelectionChange = (items: SelectedTagItem[]) => {
    const ids = items.map(item => item.id);
    setSelectedTags(ids);
    console.log('Selected with language info:', items);
  };
  
  const getSkillsTags = useCallback(async (): Promise<TagItem[]> => {
    // Real API call with multi-language support
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: 'frontend',
        label: {
          en: 'Frontend Development',
          es: 'Desarrollo Frontend',
          fr: 'Développement Frontend',
          default: 'Frontend Development'
        }
      },
      {
        id: 'backend',
        label: {
          en: 'Backend Development',
          es: 'Desarrollo Backend',
          fr: 'Développement Backend',
          default: 'Backend Development'
        }
      },
      {
        id: 'design',
        label: {
          en: 'UI/UX Design',
          es: 'Diseño UI/UX',
          fr: 'Conception UI/UX',
          default: 'UI/UX Design'
        }
      }
    ];
  }, []);

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => setLanguage('en')}>English</button>
        <button onClick={() => setLanguage('es')}>Español</button>
        <button onClick={() => setLanguage('fr')}>Français</button>
      </div>
      
      <TagSelector
        getTagsFunction={getSkillsTags}
        selectedTags={selectedTags}
        onSelectionChange={handleSelectionChange}
        useNewSelectionFormat={true} // Opt-in to new {id, language}[] format
        allowMultiple={true}
        allowAll={false}
        size="lg"
      />
      
      <div className="mt-4 text-sm text-gray-600">
        Selected: {selectedTags.join(', ') || 'None'} | Language: {currentLanguage}
      </div>
    </div>
  );
}`;

  const propsInterface = `interface TagSelectorProps {
  // Core Props
  id?: string;
  className?: string;
  style?: CSSProperties;
  
  // TagSelector Specific - NEW ASYNC APPROACH
  getTagsFunction?: TagsFunction; // NEW: Async function to load tags
  tags?: Tag[]; // LEGACY: Static tags array (backward compatibility)
  selectedTags: string[];
  onSelectionChange: (selectedTags: string[] | SelectedTagItem[]) => void; // Legacy string[] or new {id, language}[]
  useNewSelectionFormat?: boolean; // Opt-in to new callback format (default: false)
  
  // NEW: Multi-language support for built-in labels
  allLabel?: MultiLanguageLabel; // Custom label for "All" button
  defaultLabel?: MultiLanguageLabel; // Custom label for default state
  allowMultiple?: boolean; // Default: true
  allowAll?: boolean; // Default: true
  size?: 'sm' | 'md' | 'lg'; // Default: 'md'
  disabled?: boolean; // Default: false
  
  // Responsive Visibility
  config?: VisibilityConfig; // Controls responsive behavior
}

// NEW TYPES for async multi-language support
type TagsFunction = () => Promise<TagItem[]>;

interface TagItem {
  id: string;
  label: MultiLanguageLabel;
}

interface MultiLanguageLabel {
  [languageCode: string]: string; // e.g., en: "Fruit", es: "Fruta"
  default: string; // Fallback language
}

// NEW: Callback return type with language information
interface SelectedTagItem {
  id: string;
  language: string; // Current language when selected
}

// LEGACY TYPE for backward compatibility
interface Tag {
  id: string;
  label: string; // Single language only
}`;

  const singleSelectionExample = `// Single selection mode (radio-like behavior)
export function SingleSelectionTags() {
  const [selectedTag, setSelectedTag] = useState<string[]>(['medium']);
  
  // NEW: Handle the updated callback format
  const handleSingleSelection = (items: SelectedTagItem[]) => {
    const ids = items.map(item => item.id);
    setSelectedTag(ids);
  };
  
  const priorities: Tag[] = [
    { id: 'low', label: 'Low Priority' },
    { id: 'medium', label: 'Medium Priority' },
    { id: 'high', label: 'High Priority' },
    { id: 'urgent', label: 'Urgent' }
  ];

  return (
    <TagSelector
      tags={priorities}
      selectedTags={selectedTag}
      onSelectionChange={handleSingleSelection}
      useNewSelectionFormat={true} // Opt-in to new {id, language}[] format
      allowMultiple={false} // Only one can be selected
      allowAll={false} // No "All" button
      size="sm"
    />
  );
}`;

  const responsiveExample = `// Responsive visibility example
const responsiveConfig = {
  mobile: { portrait: true, landscape: false },
  tablet: { portrait: true, landscape: true },
  desktop: true
};

// NEW: Handle the updated callback format
const handleResponsiveSelection = (items: SelectedTagItem[]) => {
  const ids = items.map(item => item.id);
  setSelectedTags(ids);
};

<TagSelector
  tags={tags}
  selectedTags={selectedTags}
  onSelectionChange={handleResponsiveSelection}
  useNewSelectionFormat={true} // Opt-in to new {id, language}[] format
  config={responsiveConfig}
  size="md"
/>`

  const propExplanations = [
    { prop: 'tags', type: 'Tag[]', default: 'required', description: 'Array of tag objects with id and label' },
    { prop: 'selectedTags', type: 'string[]', default: 'required', description: 'Array of currently selected tag IDs' },
    { prop: 'onSelectionChange', type: '(items: string[] | SelectedTagItem[]) => void', default: 'required', description: 'Callback when selection changes - string[] (legacy) or {id, language}[] format' },
    { prop: 'useNewSelectionFormat', type: 'boolean', default: 'false', description: 'Opt-in to new {id, language}[] callback format instead of legacy string[]' },
    { prop: 'allowMultiple', type: 'boolean', default: 'true', description: 'Allow multiple tag selection' },
    { prop: 'allowAll', type: 'boolean', default: 'true', description: 'Show "All" button to select/deselect all tags' },
    { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant affecting padding and font size' },
    { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disable all tag interactions' },
    { prop: 'langOverride', type: 'string', default: 'undefined', description: 'Override language for i18n translations' },
    { prop: 'i18nOrder', type: "'global-first' | 'local-first'", default: 'undefined', description: 'Order of i18n resolution priority' },
    { prop: 'config', type: 'VisibilityConfig', default: 'undefined', description: 'Responsive visibility configuration' },
    { prop: 'allLabel', type: 'MultiLanguageLabel', default: 'undefined', description: 'Custom multi-language label for "All" button/chip' },
    { prop: 'defaultLabel', type: 'MultiLanguageLabel', default: 'undefined', description: 'Custom multi-language label for default state' }
  ];
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">React Implementation</h3>
            <p className="text-sm text-muted-foreground">Complete TagSelector component documentation and usage patterns</p>
          </div>
          <div className="p-6 space-y-6">
            {/* Import Statement */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Import</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground whitespace-pre">
                  {importStatement}
                </code>
              </div>
            </div>

            {/* Basic Example */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Basic Multi-Selection</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {basicExample}
                </code>
              </div>
            </div>

            {/* Advanced Example */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Advanced Usage with Filtering</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {advancedExample}
                </code>
              </div>
            </div>

            {/* Single Selection */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Single Selection Mode</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {singleSelectionExample}
                </code>
              </div>
            </div>

            {/* Responsive Visibility */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Responsive Visibility</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {responsiveExample}
                </code>
              </div>
            </div>

            {/* Props Interface */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Props Interface</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {propsInterface}
                </code>
              </div>
            </div>

            {/* Props Documentation */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Props Documentation</h4>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Prop</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Default</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propExplanations.map((prop, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="px-4 py-2 font-mono text-sm text-foreground">{prop.prop}</td>
                        <td className="px-4 py-2 font-mono text-sm text-muted-foreground">{prop.type}</td>
                        <td className="px-4 py-2 font-mono text-sm text-muted-foreground">{prop.default}</td>
                        <td className="px-4 py-2 text-sm text-muted-foreground">{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}