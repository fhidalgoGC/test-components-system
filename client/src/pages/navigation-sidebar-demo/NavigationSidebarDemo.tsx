import {
  BasicDemo,
  CustomHeaderDemo,
  CustomFooterDemo,
  NestedItemsDemo,
  ManyItemsDemo,
  FullCustomDemo,
} from './components';

export default function NavigationSidebarDemo() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">NavigationSidebar Demo</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Componente de navegación lateral con Header, Body y Footer configurables.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">1. Básico (Default)</h2>
            <p className="text-sm text-gray-500 mb-3">
              Header y Footer predeterminados. Footer con tema/idioma.
            </p>
          </div>
          <BasicDemo />
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">2. Header Personalizado</h2>
            <p className="text-sm text-gray-500 mb-3">
              headerContent con logo, título y badge de versión.
            </p>
          </div>
          <CustomHeaderDemo />
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">3. Footer Personalizado</h2>
            <p className="text-sm text-gray-500 mb-3">
              footerContent con perfil de usuario y botón logout.
            </p>
          </div>
          <CustomFooterDemo />
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">4. Items Anidados</h2>
            <p className="text-sm text-gray-500 mb-3">
              Items con children y componentes personalizados (badge "New").
            </p>
          </div>
          <NestedItemsDemo />
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">5. Muchos Items (Scroll)</h2>
            <p className="text-sm text-gray-500 mb-3">
              Demuestra que solo el Body hace scroll, Header/Footer fijos.
            </p>
          </div>
          <ManyItemsDemo />
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">6. Full Custom</h2>
            <p className="text-sm text-gray-500 mb-3">
              Header y Footer completamente personalizados con gradientes.
            </p>
          </div>
          <FullCustomDemo />
        </div>
      </div>
    </div>
  );
}
