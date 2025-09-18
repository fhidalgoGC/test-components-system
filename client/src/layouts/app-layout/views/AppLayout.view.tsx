import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { useAppLayout } from '../hooks/AppLayout.hook';
import { containerClasses, mainClasses, contentClasses } from '../css/AppLayout.module';
import type { AppLayoutProps } from '../types/AppLayout.types';

export function AppLayoutView(props: AppLayoutProps) {
  const { children, className = '' } = props;
  
  const {
    location,
    currentTheme,
    menuItems,
    headerTitle,
    headerDescription,
    showActionButtons,
    handleNavigation
  } = useAppLayout(props);

  return (
    <div className={`${containerClasses(currentTheme, className)}`}>
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
      <main className={mainClasses(currentTheme)}>
        {/* Navbar */}
        <Navbar
          title={headerTitle}
          description={headerDescription}
          showBorder={true}
        />

        {/* Page Content */}
        <div className={contentClasses(currentTheme)}>
          {children}
        </div>
      </main>
    </div>
  );
}