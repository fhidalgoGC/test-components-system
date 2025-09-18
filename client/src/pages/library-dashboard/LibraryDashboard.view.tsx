import ComponentLayout from '@/layouts/component-layout';
import { useLibraryDashboard } from './hooks';
import type { TabConfig } from './types/LibraryDashboard.types';
import { Preview, ReactDoc, CSSDoc, UsageDoc } from './documentation';
import { containerClasses } from './css/LibraryDashboard.module';
import { useTheme } from 'next-themes';

interface LibraryDashboardViewProps {
  className?: string;
}

export function LibraryDashboardView({ className }: LibraryDashboardViewProps) {
  const { t } = useLibraryDashboard();
  const { resolvedTheme } = useTheme();
  const currentTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';

  const tabs: TabConfig[] = [
    {
      id: 'preview',
      label: 'Components Structure',
      icon: 'fa-sitemap',
      content: <Preview />
    },
    {
      id: 'react',
      label: 'React',
      icon: 'fa-code',
      content: <ReactDoc />
    },
    {
      id: 'css',
      label: 'CSS',
      icon: 'fa-palette',
      content: <CSSDoc />
    },
    {
      id: 'usage',
      label: 'Uso',
      icon: 'fa-book',
      content: <UsageDoc />
    }
  ];

  return (
    <div className={containerClasses(currentTheme, className)} data-testid="library-dashboard">
      <ComponentLayout
        componentName={t('title')}
        componentDescription={t('description')}
        tabs={tabs}
        defaultTab="preview"
      />
    </div>
  );
}