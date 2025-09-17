import ComponentLayout from '@/components/layouts/ComponentLayout';
import { useLibraryDashboard } from './hooks';
import type { TabConfig } from './LibraryDashboard.types';
import { Preview, ReactDoc, CSSDoc, UsageDoc } from './documentation';
import './LibraryDashboard.css';

interface LibraryDashboardViewProps {
  className?: string;
}

export function LibraryDashboardView({ className }: LibraryDashboardViewProps) {
  const { t } = useLibraryDashboard();

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
    <div className={`library-dashboard ${className || ''}`} data-testid="library-dashboard">
      <ComponentLayout
        componentName={t.title}
        componentDescription={t.description}
        tabs={tabs}
        defaultTab="preview"
      />
    </div>
  );
}