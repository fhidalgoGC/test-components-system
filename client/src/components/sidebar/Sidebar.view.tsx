import { ChevronDown, ChevronRight, Sun, Moon, Globe, Package } from 'lucide-react';
import { useSidebar } from './hooks';
import { getSidebarTranslations } from './i18n';
import type { SidebarProps } from './Sidebar.types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Simple icon mapping - you can expand this as needed
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
    toggleItemExpansion,
    handleNavigation,
    handleThemeToggle,
    handleLanguageChange
  } = useSidebar(props);

  const t = getSidebarTranslations(currentLanguage);

  const { 
    className = '', 
    brandTitle = 'UI Library',
    brandSubtitle,
    version = 'v1.2.0',
    BrandIcon = Package
  } = props;

  return (
    <div 
      className={`sidebar flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 ${className}`}
      style={{ width: '280px' }}
      data-testid="sidebar"
    >
      {/* Brand Header */}
      <div className="px-4 border-b border-gray-200 dark:border-gray-700 flex items-center" style={{ height: '74px', minHeight: '74px', boxSizing: 'border-box' }}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BrandIcon className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 
                className="font-semibold text-gray-900 dark:text-white" 
                data-testid="text-brand-title"
              >
                {brandTitle}
              </h1>
              {brandSubtitle && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {brandSubtitle}
                </p>
              )}
            </div>
          </div>
          <span 
            className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full font-medium"
            data-testid="text-brand-version"
          >
            {version}
          </span>
        </div>
      </div>

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
                    if (hasChildren) {
                      toggleItemExpansion(item.id);
                    } else if (item.path) {
                      handleNavigation(item.path);
                    }
                  }}
                  className={`
                    menu-item w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                    ${item.isActive 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                  data-testid={`nav-${item.id}`}
                >
                  <IconComponent className="h-5 w-5 mr-3" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {hasChildren && (
                    <div className="ml-2">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  )}
                </button>

                {/* Submenu */}
                {hasChildren && isExpanded && item.children && (
                  <div className="submenu ml-8 space-y-1">
                    {item.children.map((subItem) => {
                      const SubIconComponent = subItem.icon ? getIcon(subItem.icon) : null;
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => handleNavigation(subItem.path)}
                          className={`
                            submenu-item w-full flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200
                            ${subItem.isActive
                              ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                            }
                          `}
                          data-testid={`nav-${subItem.id}`}
                        >
                          {SubIconComponent && <SubIconComponent className="h-4 w-4 mr-3" />}
                          <span>{subItem.label}</span>
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
        <div className="grid grid-cols-2 gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleThemeToggle}
            title={t.themeToggle.switch}
            className="flex items-center justify-center"
            data-testid="button-theme-toggle"
          >
            {currentTheme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Language Selector */}
          <Select value={currentLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="h-9" data-testid="select-language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es" data-testid="language-es">ES</SelectItem>
              <SelectItem value="en" data-testid="language-en">EN</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}