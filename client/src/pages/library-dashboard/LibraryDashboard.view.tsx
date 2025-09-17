import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import ComponentLayout from '@/components/layouts/ComponentLayout';
import { 
  getAvailableComponents, 
  getComingSoonComponents, 
  getLibraryFeatures, 
  getCodeExamples,
  getIconBgClass 
} from './LibraryDashboard.utils';
import type { TabConfig } from './LibraryDashboard.types';
import { useLibraryDashboard } from './hooks';
import { MousePointer, Tags, Edit, Square, Maximize, Palette, Languages, Smartphone, Puzzle, Book, Download } from 'lucide-react';
import './LibraryDashboard.css';

interface LibraryDashboardViewProps {
  className?: string;
}

export function LibraryDashboardView({ className }: LibraryDashboardViewProps) {
  const { t } = useLibraryDashboard();
  const availableComponents = getAvailableComponents();
  const comingSoonComponents = getComingSoonComponents();
  const libraryFeatures = getLibraryFeatures();
  const codeExamples = getCodeExamples();
  
  // Icon mapping for lucide-react
  const iconMap = {
    'mouse-pointer': MousePointer,
    'tags': Tags, 
    'edit': Edit,
    'square': Square,
    'maximize': Maximize,
    'palette': Palette,
    'languages': Languages,
    'smartphone': Smartphone,
    'puzzle': Puzzle,
    'book': Book,
    'download': Download
  };

  // Tab content components
  const ComponentStructureContent = () => (
    <div className="space-y-8">
      {/* Components Overview */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">{t.components.structure || 'Component Structure'}</h3>
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
            <h3 className="font-semibold text-foreground">{t.components.available}</h3>
            <p className="text-sm text-muted-foreground">Ready-to-use UI components</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 component-grid">
              {/* Available Components */}
              {availableComponents.map((component) => (
                <Link key={component.name} href={component.href} data-testid={`link-${component.name.toLowerCase()}`}>
                  <div className="border border-border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer group component-card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 ${getIconBgClass(component.iconColor)} rounded-lg flex items-center justify-center`}>
                        {(() => {
                          const IconComponent = iconMap[component.icon as keyof typeof iconMap];
                          return IconComponent ? <IconComponent className={`${component.iconColor} w-4 h-4`} /> : null;
                        })()}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground group-hover:text-accent-foreground" data-testid={`text-${component.name.toLowerCase()}-title`}>{component.name}</h4>
                        <p className="text-xs text-muted-foreground">{component.description}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {component.features.map((feature, index) => (
                        <div key={index}>{feature}</div>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}

              {/* Coming Soon Components */}
              {comingSoonComponents.map((component) => (
                <div key={component.name} className="border border-border border-dashed rounded-lg p-4 opacity-60">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      {(() => {
                        const IconComponent = iconMap[component.icon as keyof typeof iconMap];
                        return IconComponent ? <IconComponent className={`${component.iconColor} w-4 h-4`} /> : null;
                      })()}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{component.name}</h4>
                      <p className="text-xs text-muted-foreground">{component.description}</p>
                    </div>
                  </div>
                  <div className="text-xs text-center bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    {t.components.comingSoon || 'Coming Soon'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-0">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground">{t.components.features}</h3>
              <p className="text-sm text-muted-foreground">Built-in capabilities</p>
            </div>
            <div className="p-6 space-y-4">
              {libraryFeatures.map((feature) => (
                <div key={feature.name} className="flex items-center gap-3 feature-card">
                  <div className={`w-8 h-8 ${getIconBgClass(feature.iconColor)} rounded-lg flex items-center justify-center`}>
                    {(() => {
                      const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
                      return IconComponent ? <IconComponent className={`${feature.iconColor} w-4 h-4 feature-icon`} /> : null;
                    })()}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{feature.name}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
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
                  <code className="text-muted-foreground">{codeExamples.installation}</code>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Basic Usage</h4>
                <div className="bg-background rounded p-3 font-mono text-sm">
                  <code className="text-muted-foreground code-block">
                    {codeExamples.basicUsage}
                  </code>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="default" size="sm" className="flex-1" data-testid="button-documentation">
                  <Book className="mr-2 w-4 h-4" />
                  {t.actions.documentation}
                </Button>
                <Button variant="secondary" size="sm" className="flex-1" data-testid="button-download">
                  <Download className="mr-2 w-4 h-4" />
                  {t.actions.download}
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
            <code className="text-muted-foreground whitespace-pre code-block">
              {codeExamples.reactIntegration}
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
            <code className="text-muted-foreground whitespace-pre code-block">
              {codeExamples.htmlStructure}
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
            <code className="text-muted-foreground whitespace-pre code-block">
              {codeExamples.cssVariables}
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
                <code className="text-muted-foreground code-block">
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
                <code className="text-muted-foreground whitespace-pre code-block">
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
                <code className="text-muted-foreground whitespace-pre code-block">
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

  const tabs: TabConfig[] = [
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
    <div className={`library-dashboard ${className || ''}`} data-testid="library-dashboard">
      <ComponentLayout
        componentName={t.title}
        componentDescription={t.description}
        tabs={tabs}
        defaultTab="structure"
      />
    </div>
  );
}