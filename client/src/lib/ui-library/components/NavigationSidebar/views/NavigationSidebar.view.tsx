import { ChevronDown, ChevronRight, Sun, Moon, ChevronLeft, Menu, X, Package } from 'lucide-react';
import type { NavigationSidebarProps, NavigationSubItem } from '../types';
import { useNavigationSidebar } from '../hooks';
import { useI18nMerge } from '../hooks/useI18nMerge.hook';
import styles from '../css/NavigationSidebar.module.css';

export function NavigationSidebarView(props: NavigationSidebarProps) {
  const {
    processedItems,
    expandedItems,
    isCollapsed,
    isMobileMenuOpen,
    currentTheme,
    currentLanguage,
    toggleItemExpansion,
    handleNavigation,
    handleThemeToggle,
    handleLanguageChange,
    handleToggleCollapse,
    handleToggleMobileMenu,
  } = useNavigationSidebar(props);

  const { t } = useI18nMerge(props.langOverride, { order: props.i18nOrder });

  const {
    className = '',
    headerContent,
    showThemeToggle = true,
    showLanguageSelector = true,
    availableLanguages = ['en', 'es'],
    footerContent,
    collapsedWidth = 80,
    expandedWidth = 280,
  } = props;

  const isDark = currentTheme === 'dark';
  const sidebarWidth = isCollapsed ? collapsedWidth : expandedWidth;

  return (
    <>
      <button
        onClick={handleToggleMobileMenu}
        className={`lg:hidden ${styles.mobileMenuButton} ${isDark ? styles.dark : ''}`}
        data-testid="button-mobile-menu"
        aria-label={isMobileMenuOpen ? t('navigationsidebar.menu.closeMobile') : t('navigationsidebar.menu.openMobile')}
      >
        {isMobileMenuOpen ? (
          <X className={`${styles.iconMedium} ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
        ) : (
          <Menu className={`${styles.iconMedium} ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
        )}
      </button>

      {isMobileMenuOpen && (
        <div
          className={`lg:hidden ${styles.mobileOverlay}`}
          onClick={handleToggleMobileMenu}
          data-testid="mobile-overlay"
        />
      )}

      <div
        className={`
          ${styles.sidebar}
          ${isDark ? styles.dark : ''}
          ${isMobileMenuOpen ? styles.mobileVisible : styles.mobileHidden}
          lg:translate-x-0
          fixed lg:relative
          z-40
          ${className}
        `}
        style={{ width: `${sidebarWidth}px` }}
        data-testid="navigation-sidebar"
      >
        {/* HEADER */}
        <div className={`${styles.header} ${isDark ? styles.dark : ''}`} data-testid="sidebar-header">
          {headerContent ? (
            <div className="w-full">
              {headerContent}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <div className={`${styles.brandIcon} bg-primary`}>
                <Package className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Toggle Collapse Button */}
        <button
          onClick={handleToggleCollapse}
          className={`hidden lg:flex ${styles.toggleButton} ${isDark ? styles.dark : ''}`}
          data-testid="button-toggle-collapse"
          aria-label={isCollapsed ? t('navigationsidebar.menu.expand') : t('navigationsidebar.menu.collapse')}
        >
          {isCollapsed ? (
            <ChevronRight className={`${styles.iconSmall} ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          ) : (
            <ChevronLeft className={`${styles.iconSmall} ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          )}
        </button>

        {/* BODY - Navigation Items */}
        <nav className={styles.nav} aria-label={t('navigationsidebar.navigation.main')} data-testid="sidebar-body">
          <div className="space-y-2">
            {processedItems.map((item) => {
              const isExpanded = expandedItems.has(item.id);
              const hasChildren = item.children && item.children.length > 0;

              return (
                <div key={item.id} className="space-y-1">
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
                      ${styles.menuItem}
                      ${item.isActive ? styles.active : ''}
                      ${isDark ? styles.dark : ''}
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                    title={isCollapsed ? item.label : undefined}
                    data-testid={`nav-${item.id}`}
                  >
                    <span className={`${styles.iconContainer} ${isCollapsed ? '' : 'mr-3'}`}>
                      {item.icon || <Package className={styles.iconMedium} />}
                    </span>
                    {!isCollapsed && (
                      <>
                        <span className={`flex-1 text-left truncate ${styles.menuItemText} ${isDark ? styles.dark : ''}`}>
                          {item.label}
                        </span>
                        {hasChildren && (
                          <span className="ml-2 flex-shrink-0">
                            {isExpanded ? (
                              <ChevronDown className={styles.iconSmall} />
                            ) : (
                              <ChevronRight className={styles.iconSmall} />
                            )}
                          </span>
                        )}
                      </>
                    )}
                  </button>

                  {hasChildren && isExpanded && !isCollapsed && item.children && (
                    <div className={styles.submenu}>
                      {item.children.map((subItem: NavigationSubItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            handleNavigation(subItem.path);
                            if (isMobileMenuOpen) {
                              handleToggleMobileMenu();
                            }
                          }}
                          className={`
                            ${styles.submenuItem}
                            ${subItem.isActive ? styles.active : ''}
                            ${isDark ? styles.dark : ''}
                          `}
                          data-testid={`nav-${subItem.id}`}
                        >
                          {subItem.icon && (
                            <span className={`${styles.iconContainer} mr-3`}>
                              {subItem.icon}
                            </span>
                          )}
                          {subItem.component ? (
                            subItem.component
                          ) : (
                            <span className="truncate">{subItem.label}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* FOOTER */}
        <div className={`${styles.footer} ${isDark ? styles.dark : ''}`} data-testid="sidebar-footer">
          {footerContent ? (
            footerContent
          ) : (
            <>
              {isCollapsed ? (
                <div className="flex flex-col gap-2 items-center">
                  {showThemeToggle && (
                    <button
                      onClick={handleThemeToggle}
                      className={`w-10 h-10 p-0 flex items-center justify-center rounded-md border ${
                        isDark
                          ? 'bg-gray-800 hover:bg-gray-700 border-gray-600'
                          : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                      }`}
                      title={t('navigationsidebar.themeToggle.switch')}
                      data-testid="button-theme-toggle"
                    >
                      {isDark ? (
                        <Sun className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <Moon className="h-4 w-4 text-blue-500" />
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {showThemeToggle && (
                    <button
                      onClick={handleThemeToggle}
                      className={`flex items-center justify-center h-9 rounded-md border ${
                        isDark
                          ? 'bg-gray-800 hover:bg-gray-700 border-gray-600'
                          : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                      }`}
                      title={t('navigationsidebar.themeToggle.switch')}
                      data-testid="button-theme-toggle"
                    >
                      {isDark ? (
                        <Sun className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <Moon className="h-4 w-4 text-blue-500" />
                      )}
                    </button>
                  )}

                  {showLanguageSelector && (
                    <select
                      value={currentLanguage}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className={`h-9 px-3 rounded-md border text-sm ${
                        isDark
                          ? 'bg-gray-800 text-gray-100 border-gray-600'
                          : 'bg-white text-gray-900 border-gray-200'
                      }`}
                      data-testid="select-language"
                    >
                      {availableLanguages.map((lang) => (
                        <option key={lang} value={lang} data-testid={`language-${lang}`}>
                          {lang.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
