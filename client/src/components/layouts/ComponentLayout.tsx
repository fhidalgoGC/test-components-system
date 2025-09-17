import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

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
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || 'overview');

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
    <div className="flex flex-col h-full">
      {/* Component Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{componentName}</h2>
          <p className="text-sm text-muted-foreground">{componentDescription}</p>
        </div>
      </div>

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

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        {renderContent()}
      </div>
    </div>
  );
}