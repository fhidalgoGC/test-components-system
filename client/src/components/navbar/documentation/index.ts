export const navbarDocumentation = {
  title: 'Navbar',
  description: 'Componente de navegación superior que muestra título y descripción de la aplicación',
  preview: `
    <div className="border rounded-lg overflow-hidden">
      <Navbar
        title="UI Library"
        description="React + TypeScript modular component system"
        showBorder={true}
      />
    </div>
  `,
  react: `
import { Navbar } from '@/components/navbar';

export function AppWithNavbar() {
  return (
    <div className="min-h-screen">
      <Navbar
        title="My Application"
        description="A modern web application built with React and TypeScript"
        showBorder={true}
      />
      <main className="p-6">
        <h1>Main Content</h1>
        <p>Your application content goes here.</p>
      </main>
    </div>
  );
}
  `,
  css: `
.navbar {
  @apply w-full bg-white dark:bg-gray-900 transition-colors duration-200;
}

.navbar-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.navbar-content {
  @apply flex items-center justify-between h-16;
}

.navbar-brand {
  @apply flex flex-col justify-center;
}

.navbar-title {
  @apply text-xl font-semibold text-gray-900 dark:text-white;
}

.navbar-description {
  @apply text-sm text-gray-600 dark:text-gray-400 mt-1;
}

@media (max-width: 640px) {
  .navbar-title {
    @apply text-lg;
  }
  
  .navbar-description {
    @apply text-xs;
  }
}
  `,
  usage: `
## Uso Básico

\`\`\`tsx
import { Navbar } from '@/components/navbar';

<Navbar
  title="Mi Aplicación"
  description="Sistema de componentes modular con React y TypeScript"
  showBorder={true}
/>
\`\`\`

## Props

| Prop | Tipo | Descripción | Default |
|------|------|-------------|---------|
| \`title\` | \`string\` | Título principal de la aplicación | - |
| \`description\` | \`string\` | Descripción o subtítulo | - |
| \`className\` | \`string\` | Clases CSS adicionales | - |
| \`showBorder\` | \`boolean\` | Mostrar borde inferior | \`true\` |

## Características

- ✅ Responsivo para diferentes tamaños de pantalla
- ✅ Soporte automático para tema dark/light
- ✅ Texto truncado en pantallas pequeñas
- ✅ Accesibilidad integrada
- ✅ Sin botones (diseño limpio y simple)
- ✅ Tipografía optimizada
  `
};