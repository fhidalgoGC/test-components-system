import { useState } from 'react';
import { BottomNavigationBar } from '@/lib/ui-library/components/BottomNavigationBar';
import type { NavItem } from '@/lib/ui-library/components/BottomNavigationBar/mobile/types';
import { ConfigProvider } from '@/lib/ui-library/providers';
import { Home, Search, Bell, User, Settings } from 'lucide-react';

export default function BottomNavConfigDemo() {
  const [selectedItem, setSelectedItem] = useState<NavItem | null>(null);
  const [useConfigProvider, setUseConfigProvider] = useState(true);
  const [configTriggerOnMount, setConfigTriggerOnMount] = useState(true);

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: {
        en: 'Home',
        es: 'Inicio',
        default: 'Home',
      },
      metadata: {
        icon: <Home size={24} />,
        dataTestId: 'nav-home',
      },
    },
    {
      id: 'search',
      label: {
        en: 'Search',
        es: 'Buscar',
        default: 'Search',
      },
      metadata: {
        icon: <Search size={24} />,
        dataTestId: 'nav-search',
      },
    },
    {
      id: 'notifications',
      label: {
        en: 'Notifications',
        es: 'Notificaciones',
        default: 'Notifications',
      },
      metadata: {
        icon: <Bell size={24} />,
        dataTestId: 'nav-notifications',
      },
    },
    {
      id: 'profile',
      label: {
        en: 'Profile',
        es: 'Perfil',
        default: 'Profile',
      },
      metadata: {
        icon: <User size={24} />,
        dataTestId: 'nav-profile',
      },
    },
    {
      id: 'settings',
      label: {
        en: 'Settings',
        es: 'Ajustes',
        default: 'Settings',
      },
      metadata: {
        icon: <Settings size={24} />,
        dataTestId: 'nav-settings',
      },
    },
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

        {/* Status Display */}
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
            <p className="text-sm dark:text-gray-300">
              <strong>Config triggerOnMount:</strong>{' '}
              <span className={configTriggerOnMount ? 'text-green-600' : 'text-gray-500'}>
                {configTriggerOnMount ? 'true' : 'false'}
              </span>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Controles de Configuración</h2>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useConfigProvider}
                  onChange={(e) => setUseConfigProvider(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm dark:text-gray-300">
                  Usar ConfigProvider (envolver componente)
                </span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={configTriggerOnMount}
                  onChange={(e) => setConfigTriggerOnMount(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  disabled={!useConfigProvider}
                />
                <span className="text-sm dark:text-gray-300">
                  ConfigProvider.BOTTOM_NAV_CONFIG.TRIGGER_ON_MOUNT
                  {!useConfigProvider && ' (deshabilitado sin ConfigProvider)'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Cascada Explanation */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Cascada de Prioridades</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="font-medium dark:text-gray-200">Props directos</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {'<BottomNavigationBar triggerOnMount={...} />'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="font-medium dark:text-gray-200">ConfigProvider</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {'config.BOTTOM_NAV_CONFIG.TRIGGER_ON_MOUNT'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="font-medium dark:text-gray-200">Environment (default)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  environment.BOTTOM_NAV_CONFIG.TRIGGER_ON_MOUNT = false
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Example */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Implementación Actual</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-xs overflow-x-auto">
{useConfigProvider ? 
`// CON ConfigProvider
<ConfigProvider config={{
  BOTTOM_NAV_CONFIG: {
    TRIGGER_ON_MOUNT: ${configTriggerOnMount}
  }
}}>
  <BottomNavigationBar
    items={navItems}
    defaultSelectedId="home"
    onSelect={handleSelect}
  />
</ConfigProvider>

// El componente usará: ${configTriggerOnMount}
// (desde ConfigProvider)` 
: 
`// SIN ConfigProvider
<BottomNavigationBar
  items={navItems}
  defaultSelectedId="home"
  onSelect={handleSelect}
/>

// El componente usará: false
// (desde environment defaults)`}
          </pre>
        </div>

        {/* Test Results */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Resultado de Prueba</h2>
          <div className="space-y-2">
            <p className="text-sm dark:text-gray-300">
              🔍 <strong>Observa el console.log:</strong>
            </p>
            <ul className="list-disc list-inside text-sm dark:text-gray-300 space-y-1 ml-4">
              <li>
                Si ConfigProvider está activo y TRIGGER_ON_MOUNT = true → verás un log al montar
              </li>
              <li>
                Si ConfigProvider está inactivo → NO verás log al montar (usa default: false)
              </li>
              <li>
                Haz click en cualquier item para ver el log de selección manual
              </li>
            </ul>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Características</h2>
          <ul className="space-y-2 text-sm dark:text-gray-300">
            <li>✅ Integración con ConfigProvider</li>
            <li>✅ Cascada de prioridades (Props → Config → Environment)</li>
            <li>✅ Hook useOptionalConfig interno</li>
            <li>✅ Funciona con o sin ConfigProvider</li>
            <li>✅ Mismo patrón que AppAuthProvider</li>
            <li>✅ TypeScript type-safe con auto-inferencia</li>
          </ul>
        </div>
      </div>

      {/* The BottomNavigationBar */}
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
}
