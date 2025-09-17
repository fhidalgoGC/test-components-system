import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/ui-library/theme';

interface TabConfig {
  id: string;
  label: string;
  icon?: string;
  content: React.ReactNode;
}

interface ComponentLayoutProps {
  componentName?: string;
  componentDescription?: string;
  showStats?: boolean;
  tabs?: TabConfig[];
  defaultTab?: string;
  children?: React.ReactNode;
}

export default function ComponentLayout({ 
  componentName = "Component Library Overview",
  componentDescription = "React + TypeScript modular component system",
  showStats = false,
  tabs = [],
  defaultTab,
  children
}: ComponentLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || 'overview');
  const [location] = useLocation();

  const sidebarItems = [
    { 
      id: 'overview', 
      icon: 'fa-home', 
      label: 'Overview', 
      href: '/' 
    },
    { 
      id: 'components', 
      icon: 'fa-cube', 
      label: 'Components', 
      children: [
        { id: 'button', icon: 'fa-mouse-pointer', label: 'Button', href: '/components/button' },
        { id: 'tagselector', icon: 'fa-tags', label: 'TagSelector', href: '/components/tag-selector' },
        { id: 'textfield', icon: 'fa-edit', label: 'TextField', href: '/components/textfield', disabled: true },
        { id: 'card', icon: 'fa-square', label: 'Card', href: '/components/card', disabled: true },
        { id: 'modal', icon: 'fa-window-maximize', label: 'Modal', href: '/components/modal', disabled: true }
      ]
    },
    { 
      id: 'documentation', 
      icon: 'fa-book', 
      label: 'Documentation', 
      href: '/docs' 
    },
    { 
      id: 'storybook', 
      icon: 'fa-book-open', 
      label: 'Storybook', 
      href: '/storybook' 
    },
    { 
      id: 'configuration', 
      icon: 'fa-cog', 
      label: 'Configuration', 
      href: '/config' 
    }
  ];

  const [expandedItems, setExpandedItems] = useState<string[]>(['components']);

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (href: string) => location === href;

  const getActiveTab = () => {
    if (tabs.length === 0) return null;
    return tabs.find(tab => tab.id === activeTab) || tabs[0];
  };

  const renderContent = () => {
    if (children) {
      return children;
    }

    if (showStats) {
      return (
        <div className="space-y-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Components</p>
                    <p className="text-2xl font-bold text-foreground">24</p>
                  </div>
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-cubes text-primary text-sm"></i>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tests Passing</p>
                    <p className="text-2xl font-bold text-foreground">98%</p>
                  </div>
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-check-circle text-green-500 text-sm"></i>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Bundle Size</p>
                    <p className="text-2xl font-bold text-foreground">45KB</p>
                  </div>
                  <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-archive text-purple-500 text-sm"></i>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tree Shakable</p>
                    <p className="text-2xl font-bold text-foreground">100%</p>
                  </div>
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-leaf text-emerald-500 text-sm"></i>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Configuration Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-0">
                <div className="p-6 border-b border-border">
                  <h3 className="font-semibold text-foreground">Build Configuration</h3>
                  <p className="text-sm text-muted-foreground">Vite + TypeScript setup</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-3">Package Configuration</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-check text-orange-500"></i>
                        <span className="text-muted-foreground">ESM output format</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-check text-red-500"></i>
                        <span className="text-muted-foreground">TypeScript declarations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-check text-green-500"></i>
                        <span className="text-muted-foreground">Tree-shaking optimized</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-wrench text-blue-500"></i>
                        <span className="text-muted-foreground">Vite bundling</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-0">
                <div className="p-6 border-b border-border">
                  <h3 className="font-semibold text-foreground">Features</h3>
                  <p className="text-sm text-muted-foreground">Library capabilities</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-palette text-orange-500"></i>
                        <span className="text-muted-foreground">Automatic dark/light themes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-language text-blue-500"></i>
                        <span className="text-muted-foreground">Local-first i18n</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-mobile-alt text-green-500"></i>
                        <span className="text-muted-foreground">Responsive visibility</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-puzzle-piece text-purple-500"></i>
                        <span className="text-muted-foreground">Modular architecture</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
        </div>
      );
    }

    const activeTabData = getActiveTab();
    return activeTabData ? activeTabData.content : null;
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Fixed Sidebar */}
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

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <div key={item.id}>
                {item.href ? (
                  <Link href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                        isActive(item.href)
                          ? 'bg-accent text-accent-foreground font-medium'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                      data-testid={`nav-${item.id}`}
                    >
                      <i className={`fas ${item.icon} text-sm`}></i>
                      {item.label}
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    data-testid={`nav-${item.id}`}
                  >
                    <i className={`fas ${item.icon} text-sm`}></i>
                    <span className="flex-1 text-left">{item.label}</span>
                    <i className={`fas ${expandedItems.includes(item.id) ? 'fa-chevron-down' : 'fa-chevron-right'} text-xs`}></i>
                  </button>
                )}

                {/* Submenu */}
                {item.children && expandedItems.includes(item.id) && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <Link key={child.id} href={child.href}>
                        <div
                          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                            child.disabled
                              ? 'text-muted-foreground/50 cursor-not-allowed'
                              : isActive(child.href)
                              ? 'bg-accent text-accent-foreground font-medium'
                              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          }`}
                          data-testid={`nav-${child.id}`}
                        >
                          <i className={`fas ${child.icon} text-sm`}></i>
                          {child.label}
                          {child.disabled && (
                            <span className="ml-auto text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                              Soon
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header Bar */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{componentName}</h2>
              <p className="text-sm text-muted-foreground">{componentDescription}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="default" data-testid="export-button">
                <i className="fas fa-download mr-2"></i>
                Export Library
              </Button>
              <Button variant="secondary" data-testid="build-button">
                <i className="fas fa-play mr-2"></i>
                Build
              </Button>
            </div>
          </div>
        </header>

        {/* Tabs (if provided) */}
        {tabs.length > 0 && (
          <div className="bg-card border-b border-border">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary font-medium'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid={`tab-${tab.id}`}
                >
                  {tab.icon && <i className={`fas ${tab.icon} text-sm`}></i>}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content Area (Red Box from your image) */}
        <div className="flex-1 overflow-auto p-6">
          <div className="border-4 border-red-500 rounded-lg h-full bg-background p-6">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}