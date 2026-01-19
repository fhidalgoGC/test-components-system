import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { Home, Package, Settings, Zap, User, Crown } from 'lucide-react';

const menuItems = [
  { id: 'home', label: 'Dashboard', path: '/home', icon: <Home className="h-5 w-5" /> },
  { id: 'products', label: 'Productos', path: '/products', icon: <Package className="h-5 w-5" /> },
  { id: 'settings', label: 'Configuración', path: '/settings', icon: <Settings className="h-5 w-5" /> },
];

export default function NavSidebarFullCustomPage() {
  return (
    <div className="h-screen w-full flex">
      <NavigationSidebar
        headerContent={
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white">SuperApp</h1>
              <p className="text-xs text-gray-500">Enterprise Edition</p>
            </div>
          </div>
        }
        items={menuItems}
        currentPath="/home"
        footerContent={
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold dark:text-white">Admin</span>
                  <Crown className="h-3 w-3 text-yellow-500" />
                </div>
                <p className="text-xs text-gray-500">Plan Pro</p>
              </div>
            </div>
          </div>
        }
        onNavigate={(path) => console.log('Navigate to:', path)}
        collapsedWidth={70}
        expandedWidth={260}
      />
      <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-4">Full Custom</h1>
        <p className="text-gray-600 dark:text-gray-400">
          NavigationSidebar con Header y Footer completamente personalizados, gradientes y estilos premium.
        </p>
      </div>
    </div>
  );
}
