import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useHierarchicalTranslations, type SupportedLanguage } from '@/i18n';
import { getDefaultTabs, loadDocumentationComponents } from '../utils/ComponentLayout.utils';
import type { ComponentLayoutProps, TabConfig } from '../types/ComponentLayout.types';
import { componentLayoutTranslations } from '../i18n';

export function useComponentLayout(props: ComponentLayoutProps) {
  // Get language from localStorage or default to 'es'
  const language: SupportedLanguage = (localStorage.getItem('app-language') as SupportedLanguage) || 'es';
  
  // Use hierarchical translations
  const { t: getTranslation } = useHierarchicalTranslations(
    componentLayoutTranslations[language], 
    language
  );
  
  // Create translation object for easier access
  const translations = componentLayoutTranslations[language];

  const {
    componentName,
    componentDescription = translations.component.description,
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

  const tabs: TabConfig[] = manualTabs ? manualTabs : getDefaultTabs(documentationComponents);

  return {
    activeTab,
    setActiveTab,
    tabs,
    loading,
    error,
    currentTheme,
    componentDescription
  };
}