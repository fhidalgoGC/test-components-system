import { useLocation } from 'wouter';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import type { MenuItem } from '@/components/sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  headerTitle?: string;
  headerDescription?: string;
  showActionButtons?: boolean;
}

export default function AppLayout({ 
  children, 
  headerTitle = "UI Library",
  headerDescription = "React + TypeScript modular component system",
  showActionButtons = true
}: AppLayoutProps) {
  const [location] = useLocation();

  const menuItems: MenuItem[] = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: 'Home',
      path: '/' 
    },
    { 
      id: 'components', 
      label: 'Components', 
      icon: 'Package',
      children: [
        { id: 'button', label: 'Button', path: '/components/button' },
        { id: 'tagselector', label: 'TagSelector', path: '/components/tag-selector' }
      ]
    },
    { 
      id: 'demo', 
      label: 'Demo', 
      icon: 'Layout',
      path: '/demo' 
    }
  ];

  const handleNavigation = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar
        menuItems={menuItems}
        currentPath={location}
        onNavigate={handleNavigation}
        brandTitle="UI Library"
        brandSubtitle="React + TS Components"
        version="v1.2.0"
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar
          title={headerTitle}
          description={headerDescription}
          showBorder={true}
        />

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}