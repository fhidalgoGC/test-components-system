import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import TagSelectorComponent from '@/lib/ui-library/TagSelector';
import { CodePreview } from '@/components/code-preview';
import { PropsTable } from '@/components/props-table';
// TagItem is already imported from language types
import type { TagItem } from '@/lib/ui-library/types/language';
import { useLanguage } from '@/lib/ui-library/context/LanguageContext';
import { useTagSelectorDemo } from '../hooks/TagSelectorDemo.hook';
import styles from '../css/TagSelectorDemo.module.css';
import { containerClasses } from '../css/TagSelectorDemo.module';

// Demo async functions - real implementation examples
const getStaticTags = async (): Promise<TagItem[]> => {
  // Simulate async loading
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 'fruits',
      label: {
        en: 'Fruits',
        es: 'Frutas',
        fr: 'Fruits',
        default: 'Fruits'
      }
    },
    {
      id: 'vegetables', 
      label: {
        en: 'Vegetables',
        es: 'Vegetales',
        fr: 'Légumes',
        default: 'Vegetables'
      }
    },
    {
      id: 'dairy',
      label: {
        en: 'Dairy',
        es: 'Lácteos',
        fr: 'Produits laitiers',
        default: 'Dairy'
      }
    },
    {
      id: 'meat',
      label: {
        en: 'Meat',
        es: 'Carne',
        fr: 'Viande',
        default: 'Meat'
      }
    }
  ];
};

const getApiTags = async (): Promise<TagItem[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: 'technology',
      label: {
        en: 'Technology',
        es: 'Tecnología',
        pt: 'Tecnologia',
        default: 'Technology'
      }
    },
    {
      id: 'design',
      label: {
        en: 'Design',
        es: 'Diseño',
        it: 'Design',
        default: 'Design'
      }
    },
    {
      id: 'programming',
      label: {
        en: 'Programming',
        es: 'Programación',
        de: 'Programmierung',
        default: 'Programming'
      }
    }
  ];
};

const getErrorTags = async (): Promise<TagItem[]> => {
  // Simulate loading delay before error
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate API error
  throw new Error('Failed to load tags from API');
};

export function TagSelectorDemoView() {
  const { t, currentTheme } = useTagSelectorDemo();
  const [selectedTags, setSelectedTags] = useState<string[]>(['technology']);

  // NEW: Handle the updated callback format with complete label data
  const handleSelectionChange = (items: TagItem[]) => {
    // Extract IDs for backward compatibility with existing state
    const ids = items.map(item => item.id);
    setSelectedTags(ids);
    
    // Full data available for debugging - now includes complete label objects
    console.log('Demo selection changed:', { 
      ids, 
      fullItems: items,
      labelDetails: items.map(item => ({
        id: item.id,
        availableLabels: Object.keys(item.label),
        currentLabel: item.label[currentLanguage] || item.label.default,
        defaultLabel: item.label.default
      }))
    });
  };
  const [allowMultiple, setAllowMultiple] = useState(true);
  const [allowAll, setAllowAll] = useState(true);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [disabled, setDisabled] = useState(false);
  const [demoType, setDemoType] = useState<'async-food' | 'async-tech' | 'async-error'>('async-tech');

  // Get language context for the demo
  const { currentLanguage, setLanguage } = useLanguage();

  // Memoized async functions to avoid re-triggering loads
  const getAsyncFoodTags = useCallback(getStaticTags, []);
  const getAsyncTechTags = useCallback(getApiTags, []);
  const getAsyncErrorTags = useCallback(getErrorTags, []);

  // All demo types now use async functions with TagItem[] format

  // Generate props data for PropsTable component
  const getPropsData = () => [
    {
      name: 'getTagsFunction',
      type: 'TagsFunction',
      description: 'Required async function that returns TagItem[]. This function provides the tags to be displayed in the selector.',
      example: 'async () => [{ id: "1", label: { en: "Tag 1" } }]'
    },
    {
      name: 'selectedTags',
      type: 'string[]',
      description: 'Array of strings representing the IDs of currently selected tags. Used for state management.',
      example: '["tag1", "tag2"]'
    },
    {
      name: 'onSelectionChange',
      type: 'SelectionCallback',
      description: 'Callback function that receives TagItem[] with complete translation data when selection changes.',
      example: '(tags: TagItem[]) => console.log(tags)'
    },
    {
      name: 'allowMultiple',
      type: 'boolean',
      description: 'Boolean to enable or disable multiple tag selection. Defaults to true.',
      example: 'true'
    },
    {
      name: 'allowAll',
      type: 'boolean',
      description: 'Boolean to show or hide the "All" button. Defaults to true.',
      example: 'false'
    },
    {
      name: 'size',
      type: '"sm" | "md" | "lg"',
      description: 'Size of the tags. Options: "sm", "md", or "lg". Defaults to "md".',
      example: '"lg"'
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Boolean to disable the entire component. Defaults to false.',
      example: 'true'
    },
    {
      name: 'langOverride',
      type: 'string',
      description: 'Optional string to override the detected language for tag labels.',
      example: '"es"'
    },
    {
      name: 'i18nOrder',
      type: '"global-first" | "local-first"',
      description: 'Order of translation lookup: "global-first" or "local-first". Defaults to "local-first".',
      example: '"global-first"'
    },
    {
      name: 'allLabel',
      type: 'MultiLanguageLabel',
      description: 'MultiLanguageLabel object for customizing the "All" button text in different languages.',
      example: '{ en: "All", es: "Todos" }'
    },
    {
      name: 'defaultLabel',
      type: 'MultiLanguageLabel',
      description: 'MultiLanguageLabel object for the default tag text when no tags are available.',
      example: '{ en: "Default", es: "Por defecto" }'
    },
    {
      name: 'defaultTagLabels',
      type: 'MultiLanguageLabel',
      description: 'MultiLanguageLabel object for default tag labels when getTagsFunction returns no tags.',
      example: '{ en: "No tags", es: "Sin etiquetas" }'
    },
    {
      name: 'id',
      type: 'string',
      description: 'Optional HTML id attribute for the component container.',
      example: '"my-tag-selector"'
    },
    {
      name: 'className',
      type: 'string',
      description: 'Optional CSS class names to apply to the component container.',
      example: '"custom-selector rounded-lg"'
    },
    {
      name: 'style',
      type: 'CSSProperties',
      description: 'Optional React CSSProperties object for inline styling.',
      example: '{ width: "300px", margin: "10px" }'
    }
  ];

  // Generate props for CodePreview component
  const getCodeProps = () => {
    const funcName = 
      demoType === 'async-food' ? 'getAsyncFoodTags' : 
      demoType === 'async-tech' ? 'getAsyncTechTags' :
      'getAsyncErrorTags';
    
    const props = [
      {
        name: 'getTagsFunction',
        value: `{${funcName}}`,
        comment: 'Async function returning Promise<TagItem[]>'
      },
      {
        name: 'selectedTags',
        value: `{${JSON.stringify(selectedTags)}}`
      },
      {
        name: 'onSelectionChange',
        value: '{handleSelectionChange}',
        comment: 'Receives TagItem[] with translations'
      }
    ];
    
    if (!allowMultiple) props.push({ name: 'allowMultiple', value: '{false}' });
    if (!allowAll) props.push({ name: 'allowAll', value: '{false}' });
    if (size !== 'md') props.push({ name: 'size', value: `"${size}"` });
    if (disabled) props.push({ name: 'disabled', value: '{true}' });
    
    return props;
  };

  return (
    <div className={`${containerClasses(currentTheme)} ${styles.container}`} data-testid="tag-selector-demo">
      <div className="space-y-6 p-6">
        {/* Live Preview */}
        <Card>
          <CardContent className="p-0">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground">{t('componentName')} - Live Preview</h3>
              <p className="text-sm text-muted-foreground">{t('componentDescription')}</p>
            </div>
            <div className="p-6">
              <div className="min-h-32 bg-muted/50 rounded-lg border-2 border-dashed border-border p-6">
                <TagSelectorComponent
                  getTagsFunction={
                    demoType === 'async-food' ? getAsyncFoodTags : 
                    demoType === 'async-tech' ? getAsyncTechTags :
                    getAsyncErrorTags
                  }
                  selectedTags={selectedTags}
                  onSelectionChange={handleSelectionChange}
                  allowMultiple={allowMultiple}
                  allowAll={allowAll}
                  size={size}
                  disabled={disabled}
                  langOverride={currentLanguage}
                />
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Selected: {selectedTags.length > 0 ? selectedTags.join(', ') : 'None'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controls and Code Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <Card>
            <CardContent className="p-0">
              <div className="p-6 border-b border-border">
                <h3 className="font-semibold text-foreground">Props Controls</h3>
                <p className="text-sm text-muted-foreground">Customize the TagSelector properties</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="demo-type-select">Demo Type</Label>
                    <Select value={demoType} onValueChange={(value: 'async-food' | 'async-tech' | 'async-error') => setDemoType(value)}>
                      <SelectTrigger id="demo-type-select" data-testid="select-demo-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="async-tech">Async Tech Tags (API)</SelectItem>
                        <SelectItem value="async-food">Async Food Tags (Static)</SelectItem>
                        <SelectItem value="async-error">Async Error Demo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language-select">Language</Label>
                    <Select value={currentLanguage} onValueChange={setLanguage}>
                      <SelectTrigger id="language-select" data-testid="select-language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size-select">Size</Label>
                    <Select value={size} onValueChange={(value: 'sm' | 'md' | 'lg') => setSize(value)}>
                      <SelectTrigger id="size-select" data-testid="select-size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="multiple-switch"
                        checked={allowMultiple}
                        onCheckedChange={setAllowMultiple}
                        data-testid="switch-multiple"
                      />
                      <Label htmlFor="multiple-switch">Allow Multiple</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="all-switch"
                        checked={allowAll}
                        onCheckedChange={setAllowAll}
                        data-testid="switch-all"
                      />
                      <Label htmlFor="all-switch">Show All Button</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="disabled-switch"
                        checked={disabled}
                        onCheckedChange={setDisabled}
                        data-testid="switch-disabled"
                      />
                      <Label htmlFor="disabled-switch">Disabled</Label>
                    </div>
                  </div>
                  
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <CodePreview
            componentName="TagSelector"
            props={getCodeProps()}
            title="Generated Code"
            description="Copy this code to use with current settings"
          />

          {/* Props Table */}
          <PropsTable
            props={getPropsData()}
            title="TagSelector Props"
            description="Complete list of properties available for the TagSelector component"
          />
        </div>
      </div>
    </div>
  );
}