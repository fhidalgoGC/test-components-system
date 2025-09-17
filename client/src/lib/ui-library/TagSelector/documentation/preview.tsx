import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import TagSelectorComponent from '../index';
import type { Tag } from '../types';

export default function Preview() {
  const [selectedTags, setSelectedTags] = useState<string[]>(['react']);
  const [allowMultiple, setAllowMultiple] = useState(true);
  const [allowAll, setAllowAll] = useState(true);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [disabled, setDisabled] = useState(false);

  const tags: Tag[] = [
    { id: 'react', label: 'React' },
    { id: 'vue', label: 'Vue' },
    { id: 'angular', label: 'Angular' },
    { id: 'svelte', label: 'Svelte' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'typescript', label: 'TypeScript' }
  ];

  const generateCode = () => {
    const props = [];
    props.push(`tags={${JSON.stringify(tags, null, 2)}}`);
    props.push(`selectedTags={${JSON.stringify(selectedTags)}}`);
    props.push('onSelectionChange={setSelectedTags}');
    if (!allowMultiple) props.push('allowMultiple={false}');
    if (!allowAll) props.push('allowAll={false}');
    if (size !== 'md') props.push(`size="${size}"`);
    if (disabled) props.push('disabled={true}');
    
    return `<TagSelector\n  ${props.join('\n  ')}\n/>`;
  };

  return (
    <div className="space-y-6">
      {/* Live Preview */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Live Preview</h3>
            <p className="text-sm text-muted-foreground">Interactive TagSelector component demo</p>
          </div>
          <div className="p-6">
            <div className="min-h-32 bg-muted/50 rounded-lg border-2 border-dashed border-border p-6">
              <TagSelectorComponent
                tags={tags}
                selectedTags={selectedTags}
                onSelectionChange={setSelectedTags}
                allowMultiple={allowMultiple}
                allowAll={allowAll}
                size={size}
                disabled={disabled}
              />
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Selected: {selectedTags.length > 0 ? selectedTags.join(', ') : 'None'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Props Controls</h3>
            <p className="text-sm text-muted-foreground">Customize the TagSelector properties</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="flex gap-2">
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
                  onClick={() => setSelectedTags(tags.map(t => t.id))}
                  data-testid="button-select-all"
                >
                  Select All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedTags(['react', 'typescript'])}
                  data-testid="button-preset"
                >
                  React + TS
                </Button>
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
  );
}