import { useState } from 'react';
import { BottomNavigationBar } from '@/lib/ui-library/components/BottomNavigationBar';
import type { NavItem } from '@/lib/ui-library/components/BottomNavigationBar/mobile/types';
import { ConfigProvider } from '@/lib/ui-library/providers';
import { Home, Search, Bell, User, Settings } from 'lucide-react';

export const BottomNavConfigDemoWebView = () => {
  const [selectedItem, setSelectedItem] = useState<NavItem | null>(null);
  const [useConfigProvider, setUseConfigProvider] = useState(true);
  const [configTriggerOnMount, setConfigTriggerOnMount] = useState(true);

  const navItems: NavItem[] = [
    { id: 'home', label: { en: 'Home', es: 'Inicio', default: 'Home' }, metadata: { icon: <Home size={24} />, dataTestId: 'nav-home' } },
    { id: 'search', label: { en: 'Search', es: 'Buscar', default: 'Search' }, metadata: { icon: <Search size={24} />, dataTestId: 'nav-search' } },
    { id: 'notifications', label: { en: 'Notifications', es: 'Notificaciones', default: 'Notifications' }, metadata: { icon: <Bell size={24} />, dataTestId: 'nav-notifications' } },
    { id: 'profile', label: { en: 'Profile', es: 'Perfil', default: 'Profile' }, metadata: { icon: <User size={24} />, dataTestId: 'nav-profile' } },
    { id: 'settings', label: { en: 'Settings', es: 'Ajustes', default: 'Settings' }, metadata: { icon: <Settings size={24} />, dataTestId: 'nav-settings' } },
  ];

  const handleSelect = (item: NavItem) => {
    setSelectedItem(item);
    console.log('Selected item:', item);
  };

  const BottomNavComponent = (
    <BottomNavigationBar
      items={navItems}
      defaultSelectedId="home"
      onSelect={handleSelect}
    />
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <div className="container mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">
            BottomNavigationBar - ConfigProvider Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Prueba la integración con ConfigProvider usando cascada de prioridades
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Estado Actual</h2>
          <div className="space-y-2">
            <p className="text-sm dark:text-gray-300">
              <strong>Último seleccionado:</strong>{' '}
              {selectedItem ? (
                <span className="text-blue-600 dark:text-blue-400">
                  {selectedItem.id} - {selectedItem.label.en}
                </span>
              ) : (
                <span className="text-gray-500">Ninguno aún</span>
              )}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>ConfigProvider activo:</strong>{' '}
              <span className={useConfigProvider ? 'text-green-600' : 'text-gray-500'}>
                {useConfigProvider ? 'Sí' : 'No'}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Controles</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useConfigProvider}
                onChange={(e) => setUseConfigProvider(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm dark:text-gray-300">
                Usar ConfigProvider
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={configTriggerOnMount}
                onChange={(e) => setConfigTriggerOnMount(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                disabled={!useConfigProvider}
              />
              <span className="text-sm dark:text-gray-300">
                TRIGGER_ON_MOUNT
              </span>
            </label>
          </div>
        </div>
      </div>

      {useConfigProvider ? (
        <ConfigProvider
          parentConfig={{
            BOTTOM_NAV_CONFIG: {
              TRIGGER_ON_MOUNT: configTriggerOnMount,
            },
          }}
          priority="parent"
        >
          {BottomNavComponent}
        </ConfigProvider>
      ) : (
        BottomNavComponent
      )}
    </div>
  );
};
