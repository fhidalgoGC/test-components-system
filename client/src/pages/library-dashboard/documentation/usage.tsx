export default function UsageDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Guía de Instalación y Uso</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Aprende cómo usar los componentes de esta librería UI en tu proyecto.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium text-foreground mb-3">📦 Instalación desde NPM</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`# Instalar la librería desde npm
npm install @fremitech/ui-library

# O con yarn
yarn add @fremitech/ui-library

# O con pnpm  
pnpm add @fremitech/ui-library

# Dependencias peer (React 18+)
npm install react react-dom`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">🔗 Instalación desde GitHub</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`# Opción 1: Instalar desde release específico
npm install https://github.com/fremitech/ui-library/releases/download/v1.0.0/ui-library.tgz

# Opción 2: Instalar desde rama o tag
npm install fremitech/ui-library#v1.0.0
npm install fremitech/ui-library#main

# Opción 3: Clonar para desarrollo
git clone https://github.com/fremitech/ui-library.git
cd ui-library
npm install
npm run build`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">🏠 Desarrollo Local</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`# Este es un proyecto de demostración que incluye:
# - React + TypeScript + Vite
# - Tailwind CSS para estilos
# - Sistema de temas claro/oscuro
# - Internacionalización (ES/EN)

# Para desarrollo local, importa desde:
# client/src/lib/ui-library`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">📋 Importaciones para Proyectos Externos</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// 1. Importar estilos base (requerido)
import '@fremitech/ui-library/styles.css';

// 2. Importar componentes principales
import { Button, TagSelector } from '@fremitech/ui-library';

// 3. Importar sistema de temas
import { ThemeProvider, useTheme } from '@fremitech/ui-library/theme';

// 4. Importar tipos TypeScript
import type { 
  ButtonProps, 
  TagSelectorProps, 
  Tag 
} from '@fremitech/ui-library';`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">🏠 Importaciones para Desarrollo Local</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// Para este proyecto de demostración:

// Importar componentes principales
import { Button, TagSelector } from '@/lib/ui-library';

// Importar tipos
import type { 
  ButtonProps, 
  TagSelectorProps, 
  Tag 
} from '@/lib/ui-library';

// Importar proveedor de tema
import { ThemeProvider, useTheme } from '@/lib/ui-library/theme';

// Los estilos ya están en: client/src/index.css`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">⚙️ Configuración Inicial</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// App.tsx - Configuración para proyectos externos
import '@fremitech/ui-library/styles.css';
import { ThemeProvider } from '@fremitech/ui-library/theme';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        {/* Tu aplicación aquí */}
        <MyComponents />
      </div>
    </ThemeProvider>
  );
}

export default App;`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">🚀 Uso Básico</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// Componente de ejemplo para proyectos externos
import { useState } from 'react';
import { Button, TagSelector } from '@fremitech/ui-library';
import type { Tag } from '@fremitech/ui-library';

export function MyComponent() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const tags: Tag[] = [
    { id: '1', label: 'React' },
    { id: '2', label: 'TypeScript' },
    { id: '3', label: 'Tailwind' }
  ];

  return (
    <div className="space-y-4">
      {/* Botón principal */}
      <Button 
        intent="primary" 
        size="md"
        onClick={() => console.log('Clicked!')}
      >
        Acción Principal
      </Button>

      {/* Selector de etiquetas */}
      <TagSelector
        tags={tags}
        selectedTags={selectedTags}
        onSelectionChange={setSelectedTags}
        allowMultiple={true}
        allowAll={true}
        size="md"
      />
    </div>
  );
}`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">📋 Configuración de Tailwind (Proyectos Externos)</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// tailwind.config.js - En tu proyecto
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@fremitech/ui-library/dist/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Variables CSS requeridas por la librería
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)", 
          foreground: "var(--accent-foreground)",
        },
      },
    },
  },
  plugins: [],
}`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">🎨 Control de Temas</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// Usar el hook de temas
import { useTheme } from '@fremitech/ui-library/theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Tema actual: {theme}</p>
      <button 
        onClick={toggleTheme}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Cambiar a {theme === 'light' ? 'oscuro' : 'claro'}
      </button>
    </div>
  );
}`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">🌐 Propiedades de Componentes</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// Button - Propiedades disponibles
interface ButtonProps {
  intent?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

// TagSelector - Propiedades disponibles  
interface TagSelectorProps {
  tags: Tag[];
  selectedTags: string[];
  onSelectionChange: (tags: string[]) => void;
  allowMultiple?: boolean;
  allowAll?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

// Tag - Estructura de datos
interface Tag {
  id: string;
  label: string;
}`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">🎨 Personalización de Estilos</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`/* Los temas se configuran en client/src/index.css */
/* Variables CSS ya disponibles: */

:root {
  /* Colores principales */
  --primary: 262.1 83.3% 57.8%;
  --primary-foreground: 210 20% 98%;
  
  /* Colores de fondo */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  
  /* Colores de acento */
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 47.4% 11.2%;
}

/* Modo oscuro automático */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}