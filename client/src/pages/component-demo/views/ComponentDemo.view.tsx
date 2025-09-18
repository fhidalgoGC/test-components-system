import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { useComponentDemo } from '../hooks/ComponentDemo.hook';
import styles from '../css/ComponentDemo.module.css';
import { containerClasses, contentClasses } from '../css/ComponentDemo.module';

export function ComponentDemoView() {
  const { 
    currentPath, 
    menuItems, 
    currentTheme,
    t,
    handleNavigation 
  } = useComponentDemo();

  return (
    <div className={`${containerClasses(currentTheme)} ${styles.container}`} data-testid="component-demo">
      {/* Navbar */}
      <Navbar
        title={t('navbar.title')}
        description={t('navbar.description')}
        showBorder={true}
      />
      
      {/* Main layout with sidebar */}
      <div className="flex">
        <Sidebar
          menuItems={menuItems}
          currentPath={currentPath}
          onNavigate={handleNavigation}
        />
        
        {/* Content area */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className={contentClasses(currentTheme)}>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {t('content.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('content.description')}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t('sidebar.title')}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {t('sidebar.features').map((feature, index) => (
                      <li key={index}>✅ {feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t('navbar_section.title')}  
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {t('navbar_section.features').map((feature, index) => (
                      <li key={index}>✅ {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>{t('currentPath')}:</strong> {currentPath}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}