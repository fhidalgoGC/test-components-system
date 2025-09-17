import { ChevronDown, ChevronRight, Sun, Moon, Globe } from 'lucide-react';
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

  const { className = '' } = props;

  return (
    <div 
      className={`sidebar flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 ${className}`}
      style={{ width: '280px' }}
      data-testid="sidebar"
    >
      {/* Header with controls */}
      <div className="sidebar-header px-4 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleThemeToggle}
            title={t.themeToggle.switch}
            data-testid="button-theme-toggle"
          >
            {currentTheme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <Select value={currentLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-20 h-8" data-testid="select-language">
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
                    {item.children.map((subItem) => (
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
                        <span>{subItem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
}