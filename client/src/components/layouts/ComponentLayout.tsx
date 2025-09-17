import React, { useState, useEffect } from 'react';

interface TabConfig {
  id: string;
  label: string;
  icon: string;
  component?: React.ComponentType;
  content?: React.ReactNode;
}

interface ComponentLayoutProps {
  componentName: string;
  componentDescription?: string;
  // Legacy support for manual tabs
  tabs?: TabConfig[];
  defaultTab?: string;
}

export default function ComponentLayout({ 
  componentName,
  componentDescription = "Interactive component documentation and examples",
  tabs: manualTabs,
  defaultTab: manualDefaultTab
}: ComponentLayoutProps) {
  const [activeTab, setActiveTab] = useState(() => {
    if (manualTabs && manualDefaultTab) return manualDefaultTab;
    if (manualTabs && manualTabs.length > 0) return manualTabs[0].id;
    return 'preview';
  });
  const [documentationComponents, setDocumentationComponents] = useState<Record<string, React.ComponentType>>({});
  const [loading, setLoading] = useState(!manualTabs); // Don't load if using manual tabs
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip auto-loading if manual tabs are provided
    if (manualTabs) {
      setLoading(false);
      return;
    }

    const loadDocumentation = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use import.meta.glob to create a static module map
        const docIndex = import.meta.glob('/src/lib/ui-library/*/documentation/index.ts');
        const key = `/src/lib/ui-library/${componentName}/documentation/index.ts`;
        
        console.log('Loading documentation for:', componentName, 'key:', key);
        console.log('Available documentation paths:', Object.keys(docIndex));
        
        const load = docIndex[key];
        if (!load) {
          throw new Error(`Documentation not found for ${componentName} (${key})`);
        }
        
        const documentationModule = await load() as any;
        
        const components: Record<string, React.ComponentType> = {};
        
        // Map the exported components to our tab structure
        if (documentationModule.Preview) components.preview = documentationModule.Preview;
        if (documentationModule.ReactDoc) components.react = documentationModule.ReactDoc;
        if (documentationModule.HTMLDoc) components.html = documentationModule.HTMLDoc;
        if (documentationModule.CSSDoc) components.css = documentationModule.CSSDoc;
        if (documentationModule.UsageDoc) components.usage = documentationModule.UsageDoc;

        console.log('Loaded components:', Object.keys(components));

        if (Object.keys(components).length === 0) {
          throw new Error(`No documentation components found for ${componentName}`);
        }

        setDocumentationComponents(components);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error('Error loading documentation:', errorMessage);
        setError(`Could not load documentation for ${componentName}: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    loadDocumentation();
  }, [componentName, manualTabs]);

  const tabs: TabConfig[] = manualTabs ? manualTabs : [
    {
      id: 'preview',
      label: 'Vista Previa',
      icon: 'fa-eye',
      component: documentationComponents.preview
    },
    {
      id: 'react',
      label: 'React',
      icon: 'fa-code',
      component: documentationComponents.react
    },
    {
      id: 'css',
      label: 'CSS',
      icon: 'fa-palette',
      component: documentationComponents.css
    },
    {
      id: 'usage',
      label: 'Uso',
      icon: 'fa-book',
      component: documentationComponents.usage
    }
  ].filter(tab => tab.component); // Only filter auto-loaded tabs

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando documentación...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-exclamation-triangle text-destructive"></i>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Error de Documentación</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      );
    }

    const activeTabData = tabs.find(tab => tab.id === activeTab);
    if (!activeTabData) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground">Contenido no disponible para esta pestaña</p>
          </div>
        </div>
      );
    }

    // Handle both legacy content and new component modes
    if (activeTabData.content) {
      return <>{activeTabData.content}</>;
    }
    
    if (activeTabData.component) {
      const Component = activeTabData.component;
      return <Component />;
    }

    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground">Contenido no disponible para esta pestaña</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      {!loading && !error && tabs.length > 0 && (
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
                <i className={`fas ${tab.icon} text-sm`}></i>
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