import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { Home, Settings, LogOut, User } from 'lucide-react';

const menuItems = [
  { id: 'home', label: 'Inicio', path: '/home', icon: <Home className="h-5 w-5" /> },
  { id: 'settings', label: 'Configuración', path: '/settings', icon: <Settings className="h-5 w-5" /> },
];

export default function NavSidebarCustomFooterPage() {
  return (
    <div className="h-screen w-full flex">
      <NavigationSidebar
        items={menuItems}
        currentPath="/home"
        footerContent={
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate dark:text-white">John Doe</p>
                <p className="text-xs text-gray-500 truncate">admin@example.com</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </button>
          </div>
        }
        onNavigate={(path) => console.log('Navigate to:', path)}
      />
      <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-4">Footer Personalizado</h1>
        <p className="text-gray-600 dark:text-gray-400">
          NavigationSidebar con footerContent personalizado: perfil de usuario y botón de logout.
        </p>
      </div>
    </div>
  );
}
