import { useState } from 'react';
import { BottomNavigationBar } from '@/lib/ui-library/components/BottomNavigationBar';
import type { NavItem } from '@/lib/ui-library/components/BottomNavigationBar/mobile/types';
import { Home, Search, User, Settings, Bell } from 'lucide-react';

export default function BottomNavDemo() {
  const [selectedItem, setSelectedItem] = useState<NavItem | null>(null);
  const [controlledId, setControlledId] = useState<string>('home');
  const [triggerOnMount, setTriggerOnMount] = useState(false);
  const [disabledIds, setDisabledIds] = useState<string[]>([]);

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
    setControlledId(item.id); // ✅ Actualizar el ID controlado
    console.log('Selected item:', item);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <div className="container mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">BottomNavigationBar Demo</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Barra de navegación inferior móvil con i18n reactivo usando ItemWithMultiLanguageLabel
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
                <span className="text-gray-500">Ninguno</span>
              )}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>triggerOnMount:</strong>{' '}
              <span className={triggerOnMount ? 'text-green-600' : 'text-gray-500'}>
                {triggerOnMount ? 'Activado' : 'Desactivado'}
              </span>
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>Items deshabilitados:</strong>{' '}
              {disabledIds.length > 0 ? (
                <span className="text-red-600 dark:text-red-400">
                  [{disabledIds.join(', ')}]
                </span>
              ) : (
                <span className="text-gray-500">Ninguno</span>
              )}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Controles</h2>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={triggerOnMount}
                  onChange={(e) => setTriggerOnMount(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm dark:text-gray-300">
                  Disparar callback al montar (triggerOnMount)
                </span>
              </label>
            </div>

            <div>
              <p className="text-sm font-medium mb-2 dark:text-gray-300">
                Habilitar/Deshabilitar items (disabledIds):
              </p>
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isDisabled = disabledIds.includes(item.id);
                  return (
                    <label key={item.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isDisabled}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setDisabledIds([...disabledIds, item.id]);
                          } else {
                            setDisabledIds(disabledIds.filter(id => id !== item.id));
                          }
                        }}
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                      />
                      <span className="text-sm dark:text-gray-300">
                        Deshabilitar "{item.label.en}"
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2 dark:text-gray-300">
                Cambiar selección externa (controlado):
              </p>
              <div className="flex flex-wrap gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setControlledId(item.id)}
                    disabled={disabledIds.includes(item.id)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      controlledId === item.id
                        ? 'bg-blue-600 text-white'
                        : disabledIds.includes(item.id)
                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {item.label.en}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Características</h2>
          <ul className="space-y-2 text-sm dark:text-gray-300">
            <li>✅ Usa ItemWithMultiLanguageLabel para items</li>
            <li>✅ Selección controlada y no controlada</li>
            <li>✅ Callback onSelect al hacer click y al cambiar externamente</li>
            <li>✅ triggerOnMount para disparar callback inicial</li>
            <li>✅ Control dinámico con prop disabledIds (habilitar/deshabilitar en tiempo real)</li>
            <li>✅ i18n reactivo (cambia el idioma global para ver)</li>
            <li>✅ Estados: seleccionado, hover, disabled</li>
            <li>✅ Iconos con lucide-react en metadata</li>
            <li>✅ Labels con MultiLanguageLabel</li>
            <li>✅ dataTestId personalizado por item</li>
          </ul>
        </div>

        {/* Type Structure */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Estructura de Tipos</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-xs overflow-x-auto">
{`interface NavItem extends ItemWithMultiLanguageLabel<NavItemMetadata> {}

interface NavItemMetadata {
  icon?: React.ReactNode;
  isDisabled?: boolean;
  dataTestId?: string;
}

const items: NavItem[] = [
  {
    id: 'home',
    label: {
      en: 'Home',
      es: 'Inicio',
      default: 'Home'
    },
    metadata: {
      icon: <Home size={24} />,
      dataTestId: 'nav-home'
    }
  },
  // ...
];`}
          </pre>
        </div>

        {/* Example Code */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Uso</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-xs overflow-x-auto">
{`<BottomNavigationBar
  items={navItems}
  selectedId={controlledId}
  disabledIds={['search', 'notifications']}
  triggerOnMount={true}
  onSelect={(item) => console.log(item)}
/>`}
          </pre>
        </div>
      </div>

      {/* The BottomNavigationBar */}
      <BottomNavigationBar
        items={navItems}
        selectedId={controlledId}
        triggerOnMount={triggerOnMount}
        disabledIds={disabledIds}
        onSelect={handleSelect}
      />
    </div>
  );
}
