import { useComponentLayout } from '../hooks/ComponentLayout.hook';
import { 
  containerClasses, 
  tabsClasses, 
  tabClasses, 
  contentClasses,
  loadingClasses,
  errorClasses
} from '../css/ComponentLayout.module';
import type { ComponentLayoutProps } from '../types/ComponentLayout.types';
import styles from '../css/ComponentLayout.module.css';

export function ComponentLayoutView(props: ComponentLayoutProps) {
  const { children, className = '' } = props;
  
  const {
    activeTab,
    setActiveTab,
    tabs,
    loading,
    error,
    currentTheme,
    t
  } = useComponentLayout(props);

  const renderContent = () => {
    if (loading) {
      return (
        <div className={loadingClasses(currentTheme)}>
          <div className={styles.loadingContent}>
            <div className={styles.spinner}></div>
            <p className="text-muted-foreground">{t('loading') || 'Cargando documentación...'}</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={errorClasses(currentTheme)}>
          <div className={styles.errorContent}>
            <div className={styles.errorIcon}>
              <i className="fas fa-exclamation-triangle text-destructive"></i>
            </div>
            <h3 className={styles.errorTitle}>{t('error.title') || 'Error de Documentación'}</h3>
            <p className={styles.errorMessage}>{error}</p>
          </div>
        </div>
      );
    }

    const activeTabData = tabs.find(tab => tab.id === activeTab);
    if (!activeTabData) {
      return (
        <div className={styles.notAvailable}>
          <div className={styles.notAvailableContent}>
            <p className={styles.notAvailableMessage}>{t('error.notAvailable') || 'Contenido no disponible para esta pestaña'}</p>
          </div>
        </div>
      );
    }

    // Handle both legacy content and new component modes
    if (activeTabData.content) {
      return <>{activeTabData.content}</>;
    }
    
    if (activeTabData.component) {
      const Component = activeTabData.component;
      return <Component />;
    }

    return (
      <div className={styles.notAvailable}>
        <div className={styles.notAvailableContent}>
          <p className={styles.notAvailableMessage}>{t('error.notAvailable') || 'Contenido no disponible para esta pestaña'}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={`${containerClasses(currentTheme, className)}`}>
      {/* Tabs */}
      {!loading && !error && tabs.length > 0 && (
        <div className={tabsClasses(currentTheme)}>
          <div className={styles.tabsWrapper}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={tabClasses(currentTheme, activeTab === tab.id)}
                data-testid={`tab-${tab.id}`}
              >
                <i className={`fas ${tab.icon} text-sm`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className={contentClasses(currentTheme)}>
        {children || renderContent()}
      </div>
    </div>
  );
}