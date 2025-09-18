import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useHierarchicalTranslations, type SupportedLanguage } from '@/i18n';
import { getDefaultTabs, loadDocumentationComponents } from '../utils/ComponentLayout.utils';
import type { ComponentLayoutProps, TabConfig } from '../types/ComponentLayout.types';
import { componentLayoutTranslations } from '../i18n';

export function useComponentLayout(props: ComponentLayoutProps) {
  // Use reactive hierarchical translations
  const { t, language, changeLanguage } = useHierarchicalTranslations(
    componentLayoutTranslations
  );

  const {
    componentName,
    componentDescription = t('component.description') || "Interactive component documentation and examples",
    tabs: manualTabs,
    defaultTab: manualDefaultTab
  } = props;

  const { resolvedTheme } = useTheme();
  const currentTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';

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

        const components = await loadDocumentationComponents(componentName);
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

  // Generate reactive tabs with translations
  const tabs: TabConfig[] = manualTabs ? manualTabs : [
    {
      id: 'preview',
      label: t('tabs.preview') || 'Vista Previa',
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
      label: t('tabs.usage') || 'Uso',
      icon: 'fa-book',
      component: documentationComponents.usage
    }
  ].filter(tab => tab.component); // Only include tabs that have components

  return {
    activeTab,
    setActiveTab,
    tabs,
    loading,
    error,
    currentTheme,
    componentDescription,
    language,
    changeLanguage,
    t
  };
}