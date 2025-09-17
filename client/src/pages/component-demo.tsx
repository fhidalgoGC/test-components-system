import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import type { MenuItem } from '@/components/sidebar';

export default function ComponentDemo() {
  const [currentPath, setCurrentPath] = useState('/');

  const menuItems: MenuItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'Home',
      path: '/'
    },
    {
      id: 'components',
      label: 'Components',
      icon: 'Package',
      children: [
        { id: 'button', label: 'Button', path: '/components/button', description: 'Interactive buttons' },
        { id: 'input', label: 'Input', path: '/components/input', description: 'Form inputs' },
        { id: 'modal', label: 'Modal', path: '/components/modal', description: 'Dialog modals' }
      ]
    },
    {
      id: 'layouts',
      label: 'Layouts',
      icon: 'Layout',
      children: [
        { id: 'grid', label: 'Grid', path: '/layouts/grid', description: 'Grid layouts' },
        { id: 'flex', label: 'Flex', path: '/layouts/flex', description: 'Flexbox layouts' }
      ]
    }
  ];

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
    console.log('Navigation to:', path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar
        title="UI Library"
        description="React + TypeScript modular component system"
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Component Demo Page
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Esta página demuestra los componentes Sidebar y Navbar con todas sus funcionalidades:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    🧭 Sidebar Features
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>✅ Menús de 1 y 2 niveles</li>
                    <li>✅ Iconos personalizables</li>
                    <li>✅ Estado activo automático</li>
                    <li>✅ Cambio de tema (botón sol/luna)</li>
                    <li>✅ Selector de idioma (ES/EN)</li>
                    <li>✅ Navegación funcional</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    📄 Navbar Features  
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>✅ Título configurable</li>
                    <li>✅ Descripción configurable</li>
                    <li>✅ Sin botones (diseño limpio)</li>
                    <li>✅ Responsive</li>
                    <li>✅ Tema automático</li>
                    <li>✅ Borde opcional</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Ruta actual:</strong> {currentPath}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}