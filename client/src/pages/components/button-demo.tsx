import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button as UIButton } from '@/components/ui/button';
import ComponentLayout from '@/components/layouts/ComponentLayout';
import Button from '@/lib/ui-library/Button';

export default function ButtonDemo() {
  const [buttonSize, setButtonSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [buttonIntent, setButtonIntent] = useState<'primary' | 'secondary' | 'danger'>('primary');
  const [isDisabled, setIsDisabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = () => {
    setClickCount(prev => prev + 1);
  };

  // Tab content components
  const PreviewContent = () => (
    <div className="space-y-8">
      {/* Component Demo */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Live Demo</h3>
            <p className="text-sm text-muted-foreground">Interactive Button component with customizable properties</p>
          </div>
          <div className="p-6">
            <div className="min-h-32 bg-muted/50 rounded-lg border-2 border-dashed border-border p-6 flex items-center justify-center">
              <Button
                size={buttonSize}
                intent={buttonIntent}
                disabled={isDisabled}
                onClick={handleButtonClick}
                data-testid="demo-button"
              >
                Click Me!
              </Button>
            </div>
            <div className="mt-4 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                💡 Pasa el mouse para ver el efecto hover
              </p>
              {clickCount > 0 && (
                <div className="bg-muted rounded-lg p-3" data-testid="click-counter">
                  <p className="text-sm font-medium text-foreground">
                    Button clicked {clickCount} times
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Property Controls */}
        <Card>
          <CardContent className="p-0">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground">Properties</h3>
              <p className="text-sm text-muted-foreground">Customize the Button appearance and behavior</p>
            </div>
            <div className="p-6 space-y-4">
              {/* Size Control */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Size</label>
                <select
                  value={buttonSize}
                  onChange={(e) => setButtonSize(e.target.value as typeof buttonSize)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  data-testid="size-select"
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>

              {/* Intent Control */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Intent</label>
                <select
                  value={buttonIntent}
                  onChange={(e) => setButtonIntent(e.target.value as typeof buttonIntent)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  data-testid="intent-select"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="danger">Danger</option>
                </select>
              </div>

              {/* Disabled Control */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDisabled}
                    onChange={(e) => setIsDisabled(e.target.checked)}
                    className="rounded border-border"
                    data-testid="disabled-checkbox"
                  />
                  <span className="text-sm font-medium text-foreground">Disabled</span>
                </label>
              </div>

              {/* Test Actions */}
              <div className="pt-4 space-y-2">
                <UIButton
                  variant="outline"
                  onClick={() => {
                    setButtonSize('md');
                    setButtonIntent('primary');
                    setIsDisabled(false);
                    setClickCount(0);
                  }}
                  className="w-full"
                  data-testid="reset-button"
                >
                  Reset to Defaults
                </UIButton>
                <UIButton
                  variant="outline"
                  onClick={() => setClickCount(0)}
                  className="w-full"
                  data-testid="clear-counter"
                >
                  Clear Counter
                </UIButton>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code Example */}
        <Card>
          <CardContent className="p-0">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground">Code Example</h3>
              <p className="text-sm text-muted-foreground">Current configuration in React JSX</p>
            </div>
            <div className="p-6">
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground whitespace-pre-wrap">
{`<Button
  size="${buttonSize}"
  intent="${buttonIntent}"${isDisabled ? '\n  disabled={true}' : ''}
  onClick={handleClick}
>
  Click Me!
</Button>`}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const ReactContent = () => (
    <Card>
      <CardContent className="p-0">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground">React Implementation</h3>
          <p className="text-sm text-muted-foreground">Complete React component code</p>
        </div>
        <div className="p-6">
          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-muted-foreground whitespace-pre">
{`import React from 'react';
import { Button } from '@/lib/ui-library';

// Basic usage
export function BasicButton() {
  return (
    <Button 
      intent="primary" 
      size="md"
      onClick={() => console.log('Clicked!')}
    >
      Click Me
    </Button>
  );
}

// Advanced usage with all props
export function AdvancedButton() {
  const [loading, setLoading] = React.useState(false);
  
  const handleClick = async () => {
    setLoading(true);
    try {
      await someAsyncAction();
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Button
      intent="primary"
      size="lg"
      loading={loading}
      disabled={false}
      onClick={handleClick}
      langOverride="es"
      className="custom-class"
    >
      Submit Form
    </Button>
  );
}

// Form integration
export function FormButton() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Button 
        type="submit"
        intent="primary"
        size="md"
      >
        Submit Form
      </Button>
    </form>
  );
}`}
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const HTMLContent = () => (
    <Card>
      <CardContent className="p-0">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground">HTML Output</h3>
          <p className="text-sm text-muted-foreground">Generated HTML structure</p>
        </div>
        <div className="p-6">
          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-muted-foreground whitespace-pre">
{`<!-- Basic Button -->
<button 
  class="btn btn-primary btn-md" 
  type="button"
  data-testid="demo-button"
>
  Click Me!
</button>

<!-- Disabled Button -->
<button 
  class="btn btn-primary btn-md btn-disabled" 
  type="button"
  disabled="true"
>
  Click Me!
</button>

<!-- Loading Button -->
<button 
  class="btn btn-primary btn-md btn-loading" 
  type="button"
  disabled="true"
>
  <span class="btn-spinner"></span>
  Loading...
</button>

<!-- Size Variants -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-md">Medium</button>
<button class="btn btn-primary btn-lg">Large</button>

<!-- Intent Variants -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-danger">Danger</button>`}
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CSSContent = () => (
    <Card>
      <CardContent className="p-0">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground">CSS Styles</h3>
          <p className="text-sm text-muted-foreground">Component styling and CSS classes</p>
        </div>
        <div className="p-6">
          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-muted-foreground whitespace-pre">
{`/* Base Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  font-family: inherit;
}

.btn:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Size Variants */
.btn-sm { 
  padding: 0.5rem 0.75rem; 
  font-size: 0.875rem; 
  min-height: 2rem;
}
.btn-md { 
  padding: 0.625rem 1rem; 
  font-size: 0.875rem; 
  min-height: 2.5rem;
}
.btn-lg { 
  padding: 0.75rem 1.25rem; 
  font-size: 1rem; 
  min-height: 3rem;
}

/* Intent Variants */
.btn-primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
.btn-primary:hover:not(.btn-disabled) {
  background: hsl(var(--primary) / 0.9);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px hsl(var(--primary) / 0.3);
}

.btn-secondary {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  border: 1px solid hsl(var(--border));
}
.btn-secondary:hover:not(.btn-disabled) {
  background: hsl(var(--secondary) / 0.8);
}

.btn-ghost {
  background: transparent;
  color: hsl(var(--foreground));
}
.btn-ghost:hover:not(.btn-disabled) {
  background: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.btn-danger {
  background: hsl(var(--destructive));
  color: hsl(var(--destructive-foreground));
}
.btn-danger:hover:not(.btn-disabled) {
  background: hsl(var(--destructive) / 0.9);
}

/* States */
.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.btn-loading {
  position: relative;
  color: transparent;
}

.btn-spinner {
  position: absolute;
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Dark Theme Adjustments */
:root.dark .btn-primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

:root.dark .btn-secondary {
  background: hsl(var(--secondary));
  border-color: hsl(var(--border));
}

/* Responsive Design */
@media (max-width: 768px) {
  .btn-lg {
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
  }
}`}
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const UsageContent = () => (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Installation</h3>
            <p className="text-sm text-muted-foreground">How to install and import the Button component</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Package Installation</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground">
                  npm install @fremitech/ui<br/>
                  # or<br/>
                  yarn add @fremitech/ui
                </code>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Import Statement</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground">
                  import {'{ Button }'} from '@fremitech/ui';
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Component Information</h3>
            <p className="text-sm text-muted-foreground">Technical details and features</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-foreground mb-2">Properties</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>size:</strong> sm | md | lg</li>
                  <li>• <strong>intent:</strong> primary | secondary | ghost | danger</li>
                  <li>• <strong>disabled:</strong> boolean</li>
                  <li>• <strong>loading:</strong> boolean</li>
                  <li>• <strong>onClick:</strong> function</li>
                  <li>• <strong>children:</strong> ReactNode</li>
                  <li>• <strong>langOverride:</strong> string</li>
                  <li>• <strong>className:</strong> string</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Responsive sizing</li>
                  <li>• Loading states</li>
                  <li>• Multiple variants</li>
                  <li>• Internationalization</li>
                  <li>• Theme-aware styling</li>
                  <li>• Accessibility ready</li>
                  <li>• TypeScript support</li>
                  <li>• CSS Modules styling</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Use Cases</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Form submissions</li>
                  <li>• Navigation actions</li>
                  <li>• Call-to-action buttons</li>
                  <li>• Modal dialogs</li>
                  <li>• Toolbars</li>
                  <li>• Action menus</li>
                  <li>• Download triggers</li>
                  <li>• Authentication flows</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Examples</h3>
            <p className="text-sm text-muted-foreground">Common usage patterns</p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Basic Form Button</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground whitespace-pre">
{`<form onSubmit={handleSubmit}>
  <Button 
    type="submit" 
    intent="primary"
    loading={isSubmitting}
  >
    Submit
  </Button>
</form>`}
                </code>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Async Action Button</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground whitespace-pre">
{`const handleSave = async () => {
  setLoading(true);
  try {
    await saveData();
    showSuccess('Data saved!');
  } catch (error) {
    showError('Failed to save');
  } finally {
    setLoading(false);
  }
};

<Button 
  intent="primary"
  loading={loading}
  onClick={handleSave}
>
  Save Changes
</Button>`}
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    {
      id: 'preview',
      label: 'Vista Previa',
      icon: 'fa-eye',
      content: <PreviewContent />
    },
    {
      id: 'react',
      label: 'React',
      icon: 'fa-code',
      content: <ReactContent />
    },
    {
      id: 'html',
      label: 'HTML',
      icon: 'fa-file-code',
      content: <HTMLContent />
    },
    {
      id: 'css',
      label: 'CSS',
      icon: 'fa-palette',
      content: <CSSContent />
    },
    {
      id: 'usage',
      label: 'Uso',
      icon: 'fa-book',
      content: <UsageContent />
    }
  ];

  return (
    <ComponentLayout
      componentName="Primary Button"
      componentDescription="Botón principal para acciones importantes"
      tabs={tabs}
      defaultTab="preview"
    />
  );
}