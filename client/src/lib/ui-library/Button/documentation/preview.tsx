import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import ButtonComponent from '../index';

export default function Preview() {
  const [intent, setIntent] = useState<'primary' | 'secondary' | 'danger'>('primary');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [disabled, setDisabled] = useState(false);
  const [children, setChildren] = useState('Click Me');

  const generateCode = () => {
    const props = [];
    if (intent !== 'primary') props.push(`intent="${intent}"`);
    if (size !== 'md') props.push(`size="${size}"`);
    if (disabled) props.push('disabled={true}');
    if (children !== 'Click Me') props.push(`children="${children}"`);
    
    return `<Button${props.length > 0 ? ' ' + props.join(' ') : ''}>${children}</Button>`;
  };

  return (
    <div className="space-y-6">
      {/* Live Preview */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Live Preview</h3>
            <p className="text-sm text-muted-foreground">Interactive Button component demo</p>
          </div>
          <div className="p-6">
            <div className="min-h-32 bg-muted/50 rounded-lg border-2 border-dashed border-border p-6 flex items-center justify-center">
              <ButtonComponent
                intent={intent}
                size={size}
                disabled={disabled}
                onClick={() => alert('Button clicked!')}
                data-testid="preview-button"
              >
                {children}
              </ButtonComponent>
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
              <p className="text-sm text-muted-foreground">Customize the button properties</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="intent-select">Intent</Label>
                  <Select value={intent} onValueChange={(value: 'primary' | 'secondary' | 'danger') => setIntent(value)}>
                    <SelectTrigger id="intent-select" data-testid="select-intent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="danger">Danger</SelectItem>
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
                
                <div className="space-y-2">
                  <Label htmlFor="children-input">Text Content</Label>
                  <input
                    id="children-input"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    data-testid="input-children"
                  />
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
                <code className="text-muted-foreground">
                  {generateCode()}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}