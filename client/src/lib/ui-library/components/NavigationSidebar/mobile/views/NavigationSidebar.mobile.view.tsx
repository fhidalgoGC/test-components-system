import { createPortal } from 'react-dom';
import { ChevronDown, ChevronRight, Sun, Moon, X, Package } from 'lucide-react';
import { useContext, useEffect } from 'react';
import type { NavigationSidebarProps, NavigationSubItem, NavigationItem } from '../../shared/types';
import { useNavigationSidebar } from '../../shared/hooks';
import { useI18nMerge } from '../../shared/hooks/useI18nMerge.hook';
import { LibI18nContext } from '../../../../providers/AppLanguageLibUiProvider/index.hook';
import { useDrawerSwipe } from '../hooks';
import styles from '../styles/NavigationSidebar.mobile.module.css';

function useOptionalLibI18n() {
  const ctx = useContext(LibI18nContext);
  return ctx;
}

function resolveItemLabel(
  item: NavigationItem | NavigationSubItem,
  lang: string,
  libI18nResolveLabel?: (label: { [key: string]: string; default: string }) => string
): string {
  if (item.i18n) {
    if (libI18nResolveLabel) {
      return libI18nResolveLabel(item.i18n as { [key: string]: string; default: string });
    }
    return item.i18n[lang] || item.i18n.default || item.label;
  }
  return item.label;
}

export interface NavigationSidebarMobileProps extends NavigationSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function NavigationSidebarMobileView(props: NavigationSidebarMobileProps) {
  const { isOpen = false, onClose = () => {} } = props;

  const {
    processedItems,
    expandedItems,
    currentTheme,
    currentLanguage,
    toggleItemExpansion,
    handleNavigation,
    handleThemeToggle,
    handleLanguageChange,
  } = useNavigationSidebar(props);

  const { t } = useI18nMerge(props.langOverride, { order: props.i18nOrder });

  const libI18n = useOptionalLibI18n();
  const effectiveLang = libI18n?.lang || currentLanguage;
  const libResolveLabel = libI18n?.resolveLabel;

  const {
    headerIcon,
    headerContent,
    headerHeight,
    showThemeToggle = true,
    showLanguageSelector = true,
    availableLanguages = ['en', 'es'],
    footerContent,
    showFooter = true,
  } = props;

  const headerStyle = headerHeight
    ? { height: typeof headerHeight === 'number' ? `${headerHeight}px` : headerHeight, minHeight: typeof headerHeight === 'number' ? `${headerHeight}px` : headerHeight }
    : undefined;

  const isDark = currentTheme === 'dark';

  const { drawerRef, handlers: swipeHandlers } = useDrawerSwipe({
    onClose,
    isOpen,
    drawerWidth: 280,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleItemClick = (item: NavigationItem) => {
    const hasChildren = item.children && item.children.length > 0;
    if (hasChildren) {
      toggleItemExpansion(item.id);
    } else if (item.path) {
      handleNavigation(item.path);
      onClose();
    }
  };

  const handleSubItemClick = (subItem: NavigationSubItem) => {
    handleNavigation(subItem.path);
    onClose();
  };

  const content = (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onClose}
        data-testid="navigation-sidebar-mobile-overlay"
      />
      <div
        ref={drawerRef}
        className={`
          ${styles.drawer}
          ${isOpen ? styles.drawerOpen : ''}
          ${isDark ? styles.dark : ''}
        `}
        data-testid="navigation-sidebar-mobile"
        {...swipeHandlers}
      >
        <div className={`${styles.header} ${isDark ? styles.dark : ''}`} style={headerStyle} data-testid="sidebar-header-mobile">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {headerIcon ? (
              <div className="flex-shrink-0">{headerIcon}</div>
            ) : (
              <div className={`${styles.brandIcon} bg-primary flex-shrink-0`}>
                <Package className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
            {headerContent && (
              <div className="flex-1 min-w-0">{headerContent}</div>
            )}
          </div>
          <button
            onClick={onClose}
            className={`${styles.closeButton} ${isDark ? styles.dark : ''}`}
            aria-label={t('navigationsidebar.menu.closeMobile')}
            data-testid="button-close-sidebar-mobile"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.swipeIndicator} data-testid="swipe-indicator">
          <div className={`${styles.swipeBar} ${isDark ? styles.swipeBarDark : ''}`} />
        </div>

        <nav className={styles.nav} aria-label={t('navigationsidebar.navigation.main')} data-testid="sidebar-body-mobile">
          <div className="space-y-1">
            {processedItems.map((item) => {
              const isExpanded = expandedItems.has(item.id);
              const hasChildren = item.children && item.children.length > 0;

              return (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`
                      ${styles.menuItem}
                      ${item.isActive ? styles.active : ''}
                      ${isDark ? styles.dark : ''}
                    `}
                    data-testid={`nav-mobile-${item.id}`}
                  >
                    <span className={styles.iconContainer}>
                      {item.icon || <Package className={styles.iconMedium} />}
                    </span>
                    <span className="flex-1 text-left truncate">
                      {resolveItemLabel(item, effectiveLang, libResolveLabel)}
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
                  </button>

                  {hasChildren && isExpanded && item.children && (
                    <div className={styles.submenu}>
                      {item.children.map((subItem: NavigationSubItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => handleSubItemClick(subItem)}
                          className={`
                            ${styles.submenuItem}
                            ${subItem.isActive ? styles.active : ''}
                            ${isDark ? styles.dark : ''}
                          `}
                          data-testid={`nav-mobile-${subItem.id}`}
                        >
                          {subItem.icon && (
                            <span className={`${styles.iconContainer}`}>
                              {subItem.icon}
                            </span>
                          )}
                          {subItem.component ? (
                            subItem.component
                          ) : (
                            <span className="truncate">{resolveItemLabel(subItem, effectiveLang, libResolveLabel)}</span>
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

        {showFooter && (
          <div className={`${styles.footer} ${isDark ? styles.dark : ''}`} data-testid="sidebar-footer-mobile">
            {footerContent ? (
              footerContent
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {showThemeToggle && (
                  <button
                    onClick={handleThemeToggle}
                    className={`flex items-center justify-center h-10 rounded-md border ${
                      isDark
                        ? 'bg-gray-800 hover:bg-gray-700 border-gray-600'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                    }`}
                    title={t('navigationsidebar.themeToggle.switch')}
                    data-testid="button-theme-toggle-mobile"
                  >
                    {isDark ? (
                      <Sun className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Moon className="h-5 w-5 text-blue-500" />
                    )}
                  </button>
                )}

                {showLanguageSelector && (
                  <select
                    value={libI18n?.lang || currentLanguage}
                    onChange={(e) => {
                      const newLang = e.target.value as 'en' | 'es';
                      if (libI18n?.setLanguage) {
                        libI18n.setLanguage(newLang);
                      } else {
                        handleLanguageChange(newLang);
                      }
                    }}
                    className={`h-10 px-3 rounded-md border text-sm ${
                      isDark
                        ? 'bg-gray-800 text-gray-100 border-gray-600'
                        : 'bg-white text-gray-900 border-gray-200'
                    }`}
                    data-testid="select-language-mobile"
                  >
                    {availableLanguages.map((lang) => (
                      <option key={lang} value={lang} data-testid={`language-mobile-${lang}`}>
                        {lang.toUpperCase()}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );

  return createPortal(content, document.body);
}
