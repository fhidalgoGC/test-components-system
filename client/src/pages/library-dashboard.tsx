import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import ComponentLayout from '@/components/layouts/ComponentLayout';

export default function LibraryDashboard() {
  // Tab content components
  const ComponentStructureContent = () => (
    <div className="space-y-8">
      {/* Components Overview */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Component Structure</h3>
            <p className="text-sm text-muted-foreground">Modular organization following architectural guide</p>
          </div>
          <div className="p-6">
            <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
              <div className="text-muted-foreground whitespace-pre-wrap">
{`ComponentName/
├── types/           # TypeScript definitions
├── hook/            # Custom hooks
├── provider/        # Context providers
├── view/            # UI components
├── utils/           # Helper functions
├── i18n/            # Translations
└── index.tsx        # Main export`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Components */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Available Components</h3>
            <p className="text-sm text-muted-foreground">Ready-to-use UI components</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Button Component */}
              <Link href="/components/button">
                <div className="border border-border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-mouse-pointer text-primary text-sm"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground group-hover:text-accent-foreground">Button</h4>
                      <p className="text-xs text-muted-foreground">Interactive button component</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>• Multiple sizes (sm, md, lg)</div>
                    <div>• Intent variants (primary, secondary, danger)</div>
                    <div>• Loading and disabled states</div>
                  </div>
                </div>
              </Link>

              {/* TagSelector Component */}
              <Link href="/components/tag-selector">
                <div className="border border-border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-tags text-purple-500 text-sm"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground group-hover:text-accent-foreground">TagSelector</h4>
                      <p className="text-xs text-muted-foreground">Multi-selection tag component</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>• Single/multi selection modes</div>
                    <div>• Customizable tag styles</div>
                    <div>• "Select All" functionality</div>
                  </div>
                </div>
              </Link>

              {/* Coming Soon Components */}
              <div className="border border-border border-dashed rounded-lg p-4 opacity-60">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <i className="fas fa-edit text-muted-foreground text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">TextField</h4>
                    <p className="text-xs text-muted-foreground">Input field component</p>
                  </div>
                </div>
                <div className="text-xs text-center bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  Coming Soon
                </div>
              </div>

              <div className="border border-border border-dashed rounded-lg p-4 opacity-60">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <i className="fas fa-square text-muted-foreground text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Card</h4>
                    <p className="text-xs text-muted-foreground">Container component</p>
                  </div>
                </div>
                <div className="text-xs text-center bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  Coming Soon
                </div>
              </div>

              <div className="border border-border border-dashed rounded-lg p-4 opacity-60">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <i className="fas fa-window-maximize text-muted-foreground text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Modal</h4>
                    <p className="text-xs text-muted-foreground">Dialog component</p>
                  </div>
                </div>
                <div className="text-xs text-center bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-0">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground">Library Features</h3>
              <p className="text-sm text-muted-foreground">Built-in capabilities</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-palette text-orange-500 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Automatic Theming</h4>
                  <p className="text-sm text-muted-foreground">Dark/light theme support</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-language text-blue-500 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Internationalization</h4>
                  <p className="text-sm text-muted-foreground">Local-first i18n support</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-mobile-alt text-green-500 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Responsive Design</h4>
                  <p className="text-sm text-muted-foreground">Device-aware visibility</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-puzzle-piece text-purple-500 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Modular Architecture</h4>
                  <p className="text-sm text-muted-foreground">Tree-shakable imports</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground">Getting Started</h3>
              <p className="text-sm text-muted-foreground">Quick setup guide</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Installation</h4>
                <div className="bg-background rounded p-3 font-mono text-sm">
                  <code className="text-muted-foreground">npm install @fremitech/ui</code>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Basic Usage</h4>
                <div className="bg-background rounded p-3 font-mono text-sm">
                  <code className="text-muted-foreground">
{`import { Button } from '@fremitech/ui';

<Button intent="primary">
  Click me
</Button>`}
                  </code>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="default" size="sm" className="flex-1">
                  <i className="fas fa-book mr-2"></i>
                  Documentation
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                  <i className="fas fa-download mr-2"></i>
                  Download
                </Button>
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
          <h3 className="font-semibold text-foreground">React Integration</h3>
          <p className="text-sm text-muted-foreground">How to integrate the component library in React projects</p>
        </div>
        <div className="p-6">
          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-muted-foreground whitespace-pre">
{`// Install the library
npm install @fremitech/ui

// Setup theme provider
import { ThemeProvider } from '@fremitech/ui';

function App() {
  return (
    <ThemeProvider>
      <YourComponents />
    </ThemeProvider>
  );
}

// Use components
import { Button, TagSelector } from '@fremitech/ui';

export function MyComponent() {
  return (
    <div>
      <Button intent="primary" size="md">
        Primary Action
      </Button>
      
      <TagSelector
        tags={[
          { id: '1', label: 'React' },
          { id: '2', label: 'TypeScript' }
        ]}
        selectedTags={[]}
        onSelectionChange={(tags) => console.log(tags)}
      />
    </div>
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
          <h3 className="font-semibold text-foreground">HTML Structure</h3>
          <p className="text-sm text-muted-foreground">Generated HTML markup and CSS classes</p>
        </div>
        <div className="p-6">
          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-muted-foreground whitespace-pre">
{`<!-- Component Library HTML Structure -->
<div class="ui-library">
  <!-- Button Component -->
  <button class="btn btn-primary btn-md">
    Primary Button
  </button>
  
  <!-- TagSelector Component -->
  <div class="tag-selector">
    <button class="tag tag-selected">Selected Tag</button>
    <button class="tag">Available Tag</button>
  </div>
  
  <!-- Component with Theme -->
  <div class="ui-component" data-theme="dark">
    <button class="btn btn-secondary">
      Themed Button
    </button>
  </div>
</div>

<!-- CSS Classes -->
.btn { /* Base button styles */ }
.btn-primary { /* Primary variant */ }
.btn-secondary { /* Secondary variant */ }
.btn-sm, .btn-md, .btn-lg { /* Size variants */ }

.tag-selector { /* Container styles */ }
.tag { /* Individual tag styles */ }
.tag-selected { /* Selected state */ }`}
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
          <h3 className="font-semibold text-foreground">CSS Variables & Theming</h3>
          <p className="text-sm text-muted-foreground">Customizable theme variables and styling</p>
        </div>
        <div className="p-6">
          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-muted-foreground whitespace-pre">
{`/* Theme Variables */
:root {
  --primary: 210 100% 50%;
  --secondary: 210 11% 15%;
  --accent: 210 11% 11%;
  --muted: 217 33% 17%;
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
  --border: 216 34% 17%;
  --ring: 216 34% 17%;
}

/* Light Theme */
:root.light {
  --primary: 210 100% 50%;
  --secondary: 210 17% 98%;
  --accent: 210 17% 95%;
  --muted: 210 17% 95%;
  --background: 0 0% 100%;
  --foreground: 224 71% 4%;
  --border: 214 32% 91%;
  --ring: 215 25% 27%;
}

/* Component Styles */
.btn {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--border));
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.btn:hover {
  background: hsl(var(--primary) / 0.9);
  transform: translateY(-1px);
}

/* Responsive Breakpoints */
@media (max-width: 768px) {
  .btn { font-size: 0.875rem; }
}

@media (max-width: 640px) {
  .tag-selector { flex-wrap: wrap; }
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
            <h3 className="font-semibold text-foreground">Quick Start Guide</h3>
            <p className="text-sm text-muted-foreground">Get up and running with the component library</p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">1. Installation</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground">
                  npm install @fremitech/ui<br/>
                  # or<br/>
                  yarn add @fremitech/ui
                </code>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">2. Setup Theme Provider</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground">
{`import { ThemeProvider } from '@fremitech/ui';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}`}
                </code>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">3. Import Components</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground">
{`import { Button, TagSelector } from '@fremitech/ui';`}
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Common Use Cases</h3>
            <p className="text-sm text-muted-foreground">Typical implementation patterns</p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Form with Validation</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground whitespace-pre">
{`<form onSubmit={handleSubmit}>
  <Button 
    type="submit" 
    intent="primary"
    disabled={!isValid}
  >
    Submit Form
  </Button>
</form>`}
                </code>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Filter Interface</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground whitespace-pre">
{`<TagSelector
  tags={categories}
  selectedTags={filters}
  onSelectionChange={setFilters}
  allowMultiple={true}
  allowAll={true}
/>`}
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
      id: 'structure',
      label: 'Components Structure',
      icon: 'fa-sitemap',
      content: <ComponentStructureContent />
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
      componentName="Component Library Overview"
      componentDescription="React + TypeScript modular component system"
      tabs={tabs}
      defaultTab="structure"
    />
  );
}