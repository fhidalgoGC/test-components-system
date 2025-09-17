export const sidebarDocumentation = {
  title: 'Sidebar',
  description: 'Componente de navegación lateral con soporte para menús anidados, cambio de tema e idioma',
  preview: `
    <div className="flex h-64 border rounded-lg overflow-hidden">
      <Sidebar
        menuItems={[
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
              { id: 'button', label: 'Button', path: '/components/button' },
              { id: 'input', label: 'Input', path: '/components/input' }
            ]
          }
        ]}
        currentPath="/components/button"
      />
    </div>
  `,
  react: `
import { Sidebar } from '@/components/sidebar';

export function AppWithSidebar() {
  const menuItems = [
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
        { id: 'button', label: 'Button', path: '/components/button' },
        { id: 'input', label: 'Input', path: '/components/input' }
      ]
    }
  ];

  const handleNavigation = (path: string) => {
    console.log('Navigate to:', path);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        menuItems={menuItems}
        currentPath="/components/button"
        onNavigate={handleNavigation}
      />
      <main className="flex-1 p-6">
        Content area
      </main>
    </div>
  );
}
  `,
  css: `
.sidebar {
  @apply flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700;
  width: 280px;
}

.sidebar-header {
  @apply px-6 py-4 border-b border-gray-200 dark:border-gray-700;
}

.sidebar-nav {
  @apply flex-1 px-4 py-6 overflow-y-auto;
}

.menu-item {
  @apply flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors;
}

.menu-item:hover {
  @apply bg-gray-100 dark:bg-gray-800;
}

.menu-item.active {
  @apply bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300;
}

.submenu {
  @apply ml-6 space-y-1;
}

.submenu-item {
  @apply flex items-center px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 rounded-md;
}

.submenu-item:hover {
  @apply bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100;
}

.submenu-item.active {
  @apply bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300;
}
  `,
  usage: `
## Uso Básico

\`\`\`tsx
import { Sidebar } from '@/components/sidebar';

const menuItems = [
  {
    id: 'overview',
    label: 'Vista General',
    icon: 'Home',
    path: '/'
  },
  {
    id: 'components',
    label: 'Componentes',
    icon: 'Package',
    children: [
      { id: 'button', label: 'Botón', path: '/components/button' },
      { id: 'input', label: 'Input', path: '/components/input' }
    ]
  }
];

<Sidebar
  menuItems={menuItems}
  currentPath="/components/button"
  onNavigate={(path) => console.log(path)}
/>
\`\`\`

## Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| \`menuItems\` | \`MenuItem[]\` | Array de elementos del menú |
| \`currentPath\` | \`string\` | Ruta actual para resaltar elemento activo |
| \`onNavigate\` | \`(path: string) => void\` | Callback cuando se navega a una ruta |
| \`className\` | \`string\` | Clases CSS adicionales |

## Características

- ✅ Menús de 1 y 2 niveles
- ✅ Iconos personalizables
- ✅ Cambio de tema (light/dark)
- ✅ Selector de idioma
- ✅ Estado activo automático
- ✅ Navegación con callbacks
  `
};