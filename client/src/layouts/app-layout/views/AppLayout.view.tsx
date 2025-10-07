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
    handleNavigation,
    isCollapsed,
    isMobileMenuOpen,
    toggleCollapse,
    toggleMobileMenu
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
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
      />

      {/* Main Content Area */}
      <main 
        className={mainClasses(currentTheme)}
        style={{
          marginLeft: isCollapsed ? '80px' : '280px',
          width: isCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 280px)',
          transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
        }}
        data-testid="main-content"
      >
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