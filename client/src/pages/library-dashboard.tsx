import React, { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button as UIButton } from '@/components/ui/button';
import { useTheme } from '@/lib/ui-library/theme';
import Button from '@/lib/ui-library/Button';
import TagSelector from '@/lib/ui-library/TagSelector';

export default function LibraryDashboard() {
  const { theme, toggleTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const sampleTags = [
    { id: 'maiz-blanco', label: 'Maíz Blanco' },
    { id: 'wheat-hard-winter', label: 'HRW - Wheat Hard Red Winter' },
    { id: 'wheat-soft-winter', label: 'SRW - Wheat Soft Red Winter' },
    { id: 'wheat-hard-spring', label: 'HRS - Wheat Hard Red Spring' },
    { id: 'yellow-corn', label: 'YC - Yellow Corn' },
    { id: 'grain-sorghum', label: 'YGS - Yellow Grain Sorghum' },
    { id: 'whole-oats', label: 'OATS - Whole Oats' },
    { id: 'cacao-blanco', label: 'cacao blanco' },
    { id: 'frijol-amarillo', label: 'Frijol amarillo 1' },
    { id: 'soya-2025', label: 'Soya 2025' },
    { id: 'semillas-girasol', label: 'Semillas de girasol - SW' },
    { id: 'test-component', label: 'TestTestTest' },
    { id: 'maiz-amarillo', label: 'Maíz Amarillo' }
  ];

  const stats = [
    {
      label: 'Components',
      value: '24',
      icon: 'fas fa-puzzle-piece',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      label: 'Tests Passing',
      value: '98%',
      icon: 'fas fa-check-circle',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      label: 'Bundle Size',
      value: '45KB',
      icon: 'fas fa-archive',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      label: 'Tree Shakable',
      value: '100%',
      icon: 'fas fa-leaf',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/20'
    }
  ];

  const navigationItems = [
    { href: '#', label: 'Overview', icon: 'fas fa-home', active: true },
    { href: '#', label: 'Components', icon: 'fas fa-puzzle-piece', active: false },
    { href: '#', label: 'Documentation', icon: 'fas fa-book', active: false },
    { href: '#', label: 'Storybook', icon: 'fas fa-flask', active: false },
    { href: '#', label: 'Configuration', icon: 'fas fa-cog', active: false }
  ];

  const componentItems = [
    { href: '#', label: 'Button', icon: 'fas fa-mouse-pointer' },
    { href: '#', label: 'TextField', icon: 'fas fa-edit' },
    { href: '#', label: 'Card', icon: 'fas fa-th-large' },
    { href: '#', label: 'Modal', icon: 'fas fa-bars' }
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-cubes text-primary-foreground text-sm"></i>
            </div>
            <div>
              <h1 className="font-semibold text-foreground">UI Library</h1>
              <p className="text-xs text-muted-foreground">v1.2.0</p>
            </div>
          </div>
        </div>

        {/* Build Status */}
        <div className="p-4 border-b border-border">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-400">Build Passing</span>
            </div>
            <p className="text-xs text-green-600 dark:text-green-500 mt-1">Last build: 2 min ago</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <div className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                  item.active 
                    ? 'bg-accent text-accent-foreground font-medium' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}>
                  <i className={`${item.icon} text-sm`}></i>
                  {item.label}
                </div>
              </Link>
            ))}
          </div>

          {/* Component Categories */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Components
            </h3>
            <div className="space-y-1">
              {componentItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                    <i className={`${item.icon} text-sm`}></i>
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Theme & Language Controls */}
        <div className="p-4 border-t border-border">
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              data-testid="theme-toggle"
            >
              <i className={`fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'} text-sm`}></i>
            </button>
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 rounded-md bg-secondary text-secondary-foreground border-0 text-sm"
              data-testid="language-select"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header Bar */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Component Library Overview</h2>
              <p className="text-sm text-muted-foreground">React + TypeScript modular component system</p>
            </div>
            <div className="flex items-center gap-3">
              <UIButton data-testid="button-export">
                <i className="fas fa-download mr-2"></i>
                Export Library
              </UIButton>
              <UIButton variant="secondary" data-testid="button-build">
                <i className="fas fa-play mr-2"></i>
                Build
              </UIButton>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground" data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}>
                          {stat.value}
                        </p>
                      </div>
                      <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                        <i className={`${stat.icon} ${stat.color}`}></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Component Preview */}
              <Card>
                <CardContent className="p-0">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-semibold text-foreground">Component Preview</h3>
                    <p className="text-sm text-muted-foreground">Interactive component demonstration</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Button Component</h4>
                        <div className="flex flex-wrap gap-3">
                          <Button intent="primary">Primary Button</Button>
                          <Button intent="secondary">Secondary</Button>
                          <Button intent="danger">Danger</Button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">TagSelector Component</h4>
                        <TagSelector
                          tags={sampleTags}
                          selectedTags={selectedTags}
                          onSelectionChange={setSelectedTags}
                          allowMultiple={true}
                          allowAll={true}
                          size="sm"
                        />
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">TextField Component</h4>
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            placeholder="Default input" 
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            data-testid="input-default"
                          />
                          <input 
                            type="text" 
                            placeholder="With validation" 
                            className="w-full px-3 py-2 border border-green-500 rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
                            data-testid="input-validation"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Build Configuration */}
              <Card>
                <CardContent className="p-0">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-semibold text-foreground">Build Configuration</h3>
                    <p className="text-sm text-muted-foreground">Vite + TypeScript setup</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">Package Configuration</h4>
                        <div className="text-xs text-muted-foreground space-y-1 font-mono">
                          <div>📦 ESM output format</div>
                          <div>🎯 TypeScript declarations</div>
                          <div>🌳 Tree-shaking optimized</div>
                          <div>⚡ Vite bundling</div>
                        </div>
                      </div>
                      
                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">Features</h4>
                        <div className="text-xs text-muted-foreground space-y-1 font-mono">
                          <div>🎨 Automatic dark/light themes</div>
                          <div>🌍 Local-first i18n</div>
                          <div>📱 Responsive visibility</div>
                          <div>🧩 Modular architecture</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Component Structure */}
            <Card>
              <CardContent className="p-0">
                <div className="p-6 border-b border-border">
                  <h3 className="font-semibold text-foreground">Component Structure</h3>
                  <p className="text-sm text-muted-foreground">Modular folder organization following best practices</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Types Structure */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <i className="fas fa-code text-blue-500"></i>
                        Types
                      </h4>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                        <div className="space-y-1 text-muted-foreground">
                          <div>📁 types/</div>
                          <div className="ml-4">├── visibility.ts</div>
                          <div className="ml-4">├── component.ts</div>
                          <div className="ml-4">└── index.ts</div>
                        </div>
                      </div>
                    </div>

                    {/* Hooks Structure */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <i className="fas fa-fish text-green-500"></i>
                        Hooks
                      </h4>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                        <div className="space-y-1 text-muted-foreground">
                          <div>📁 hook/</div>
                          <div className="ml-4">├── useThemeSafe.ts</div>
                          <div className="ml-4">├── useI18nMerge.ts</div>
                          <div className="ml-4">├── useVisibility.ts</div>
                          <div className="ml-4">└── index.ts</div>
                        </div>
                      </div>
                    </div>

                    {/* Utils Structure */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <i className="fas fa-tools text-orange-500"></i>
                        Utils
                      </h4>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                        <div className="space-y-1 text-muted-foreground">
                          <div>📁 utils/</div>
                          <div className="ml-4">├── dom.ts</div>
                          <div className="ml-4">├── visibility.ts</div>
                          <div className="ml-4">├── i18n.ts</div>
                          <div className="ml-4">└── index.ts</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Installation & Usage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Installation */}
              <Card>
                <CardContent className="p-0">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-semibold text-foreground">Installation</h3>
                    <p className="text-sm text-muted-foreground">Quick setup guide</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">GitHub Packages</h4>
                        <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                          <code className="text-muted-foreground">
                            npm config set @fremitech:registry<br/>
                            https://npm.pkg.github.com<br/>
                            npm i @fremitech/ui
                          </code>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Direct from GitHub</h4>
                        <div className="bg-muted rounded-lg p-3 font-mono text-sm">
                          <code className="text-muted-foreground">
                            "@fremitech/ui": "git+ssh://git@github.com/<br/>
                            fremitech/ui-library.git#v1.0.0"
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Example */}
              <Card>
                <CardContent className="p-0">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-semibold text-foreground">Usage Example</h3>
                    <p className="text-sm text-muted-foreground">Basic component implementation</p>
                  </div>
                  <div className="p-6">
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                      <code className="text-muted-foreground">
                        <div>import {'{ Button, ThemeProvider }'} from '@fremitech/ui';</div><br/>
                        <div>function App() {'{'}</div>
                        <div>&nbsp;&nbsp;return (</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;ThemeProvider&gt;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Button variant="primary"&gt;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Click me!</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/Button&gt;</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/ThemeProvider&gt;</div>
                        <div>&nbsp;&nbsp;);</div>
                        <div>{'}'}</div>
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
