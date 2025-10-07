import { ChevronDown, ChevronRight, Sun, Moon, ChevronLeft, Menu, X } from 'lucide-react';
import { useSidebar } from '../hooks';
import { getSidebarTranslations } from '../i18n';
import type { SidebarProps, SubMenuItem } from '../types/Sidebar.types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { environment } from '@/enviorments/enviroment';

const iconMap: Record<string, any> = {
  'Home': ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  'Package': ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  'Layout': ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  'MousePointer': ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  ),
  'Tags': ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  'Calendar': ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
};

const getIcon = (iconName: string) => {
  return iconMap[iconName] || iconMap['Package'];
};

export function SidebarView(props: SidebarProps) {
  const {
    processedMenuItems,
    expandedItems,
    currentLanguage,
    currentTheme,
    isCollapsed,
    isMobileMenuOpen,
    toggleItemExpansion,
    handleNavigation,
    handleThemeToggle,
    handleLanguageChange,
    handleToggleCollapse,
    handleToggleMobileMenu
  } = useSidebar(props);

  const t = getSidebarTranslations(currentLanguage);

  const { 
    className = '', 
    brandTitle = 'UI Library',
    brandSubtitle,
    version = 'v1.2.0',
    BrandIcon = iconMap['Package']
  } = props;

  return (
    <>
      {/* Mobile Menu Button - Fixed position, always visible on mobile */}
      <button
        onClick={handleToggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
        data-testid="button-mobile-menu"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={handleToggleMobileMenu}
          data-testid="mobile-overlay"
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          sidebar flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:relative
          z-40
          ${className}
        `}
        style={{ width: isCollapsed ? '80px' : '280px' }}
        data-testid="sidebar"
      >
        {/* Brand Header */}
        <div 
          className="px-4 border-b border-gray-200 dark:border-gray-700 flex items-center h-[74px] min-h-[74px]" 
          data-testid="sidebar-header"
        >
          <div className="flex items-center justify-between w-full">
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <BrandIcon className="h-4 w-4 text-primary-foreground" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <h1 
                    className="font-semibold text-gray-900 dark:text-white truncate" 
                    data-testid="text-brand-title"
                  >
                    {brandTitle}
                  </h1>
                  {brandSubtitle && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {brandSubtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
            {!isCollapsed && (
              <span 
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full font-medium flex-shrink-0"
                data-testid="text-brand-version"
              >
                {version}
              </span>
            )}
          </div>
        </div>

        {/* Toggle Collapse Button - Desktop Only */}
        <button
          onClick={handleToggleCollapse}
          className="hidden lg:flex absolute -right-3 top-20 z-50 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 items-center justify-center shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          data-testid="button-toggle-collapse"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="h-3 w-3 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* Navigation Menu */}
        <nav className="sidebar-nav flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-2">
            {processedMenuItems.map((item) => {
              const IconComponent = getIcon(item.icon);
              const isExpanded = expandedItems.has(item.id);
              const hasChildren = item.children && item.children.length > 0;

              return (
                <div key={item.id} className="space-y-1">
                  {/* Main menu item */}
                  <button
                    onClick={() => {
                      if (hasChildren && !isCollapsed) {
                        toggleItemExpansion(item.id);
                      } else if (item.path) {
                        handleNavigation(item.path);
                        if (isMobileMenuOpen) {
                          handleToggleMobileMenu();
                        }
                      }
                    }}
                    className={`
                      menu-item w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                      ${item.isActive 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                    title={isCollapsed ? item.label : undefined}
                    data-testid={`nav-${item.id}`}
                  >
                    <IconComponent className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0`} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {hasChildren && (
                          <div className="ml-2 flex-shrink-0">
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </button>

                  {/* Submenu */}
                  {hasChildren && isExpanded && !isCollapsed && item.children && (
                    <div className="submenu ml-8 space-y-1">
                      {item.children.map((subItem: SubMenuItem) => {
                        const SubIconComponent = subItem.icon ? getIcon(subItem.icon) : null;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              handleNavigation(subItem.path);
                              if (isMobileMenuOpen) {
                                handleToggleMobileMenu();
                              }
                            }}
                            className={`
                              submenu-item w-full flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200
                              ${subItem.isActive
                                ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                              }
                            `}
                            data-testid={`nav-${subItem.id}`}
                          >
                            {SubIconComponent && <SubIconComponent className="h-4 w-4 mr-3 flex-shrink-0" />}
                            <span className="truncate">{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer with Theme & Language Controls */}
        <div className="mt-auto px-4 py-4 border-t border-gray-200 dark:border-gray-700">
          {isCollapsed ? (
            <div className="flex flex-col gap-2 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleThemeToggle}
                title={t.themeToggle.switch}
                className="w-10 h-10 p-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
                data-testid="button-theme-toggle"
              >
                {currentTheme === 'dark' ? (
                  <Sun className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Moon className="h-4 w-4 text-blue-500" />
                )}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleThemeToggle}
                title={t.themeToggle.switch}
                className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
                data-testid="button-theme-toggle"
              >
                {currentTheme === 'dark' ? (
                  <Sun className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Moon className="h-4 w-4 text-blue-500" />
                )}
              </Button>

              <Select value={currentLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="h-9" data-testid="select-language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {environment.AVAILABLE_LANGUAGES.map((lang: string) => (
                    <SelectItem 
                      key={lang} 
                      value={lang} 
                      data-testid={`language-${lang}`}
                    >
                      {lang.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
