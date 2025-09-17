import type { TabConfig } from './ComponentLayout.types';

export function getDefaultTabs(documentationComponents: Record<string, React.ComponentType>): TabConfig[] {
  return [
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
  ].filter(tab => tab.component); // Only include tabs that have components
}

export async function loadDocumentationComponents(componentName: string): Promise<Record<string, React.ComponentType>> {
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

  return components;
}