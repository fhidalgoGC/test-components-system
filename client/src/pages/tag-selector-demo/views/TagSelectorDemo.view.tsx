import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import TagSelectorComponent from '@/lib/ui-library/TagSelector';
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

  const generateCode = () => {
    const props = [];
    
    const funcName = 
      demoType === 'async-food' ? 'getAsyncFoodTags' : 
      demoType === 'async-tech' ? 'getAsyncTechTags' :
      'getAsyncErrorTags';
    props.push(`getTagsFunction={${funcName}}`);
    
    props.push(`selectedTags={${JSON.stringify(selectedTags)}}`);
    props.push('onSelectionChange={handleSelectionChange} // Receives TagItem[] with translations');
    if (!allowMultiple) props.push('allowMultiple={false}');
    if (!allowAll) props.push('allowAll={false}');
    if (size !== 'md') props.push(`size="${size}"`);
    if (disabled) props.push('disabled={true}');
    
    return `<TagSelector\n  ${props.join('\n  ')}\n/>`;
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
                  
                  <div className="space-y-2">
                    <Label>Quick Selection Actions</Label>
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedTags([])}
                        data-testid="button-clear"
                      >
                        Clear All
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          // For async demos, select common IDs based on demo type
                          const commonIds = demoType === 'async-food' ? ['fruits', 'vegetables'] : ['technology', 'design'];
                          setSelectedTags(commonIds);
                        }}
                        data-testid="button-select-all"
                      >
                        Select All
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          if (demoType === 'async-food') {
                            setSelectedTags(['fruits', 'dairy']);
                          } else {
                            setSelectedTags(['technology', 'programming']);
                          }
                        }}
                        data-testid="button-preset"
                      >
                        {demoType === 'async-food' ? 'Fruits + Dairy' : 'Tech + Code'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardContent className="p-0">
              <div className="p-6 border-b border-border">
                <h3 className="font-semibold text-foreground">Generated Code</h3>
                <p className="text-sm text-muted-foreground">Copy this code to use with current settings</p>
              </div>
              <div className="p-6">
                <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                  <code className="text-muted-foreground whitespace-pre">
                    {generateCode()}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}