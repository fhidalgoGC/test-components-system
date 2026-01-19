import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { Home, Package, Settings, BarChart } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: <BarChart className="h-5 w-5" /> },
  { id: 'home', label: 'Inicio', path: '/home', icon: <Home className="h-5 w-5" /> },
  { id: 'settings', label: 'Configuración', path: '/settings', icon: <Settings className="h-5 w-5" /> },
];

export default function NavSidebarCustomHeaderPage() {
  return (
    <div className="h-screen w-full flex">
      <NavigationSidebar
        headerContent={
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Package className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900 dark:text-white">Mi App</h1>
                <p className="text-xs text-gray-500">React + TS</p>
              </div>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">v2.0</span>
          </div>
        }
        items={menuItems}
        currentPath="/dashboard"
        onNavigate={(path) => console.log('Navigate to:', path)}
      />
      <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-4">Header Personalizado</h1>
        <p className="text-gray-600 dark:text-gray-400">
          NavigationSidebar con headerContent personalizado: logo, título y badge de versión.
        </p>
      </div>
    </div>
  );
}
