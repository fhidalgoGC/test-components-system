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
          <h4 className="text-md font-medium text-foreground mb-3">📦 Configuración del Proyecto</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`# Este es un proyecto local que incluye:
# - React + TypeScript + Vite
# - Tailwind CSS para estilos
# - Sistema de temas claro/oscuro
# - Internacionalización (ES/EN)

# Para usar los componentes, simplemente importa desde:
# client/src/lib/ui-library`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">📋 Importaciones Disponibles</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// Importar componentes principales
import { Button, TagSelector } from '@/lib/ui-library';

// Importar tipos
import type { 
  ButtonProps, 
  TagSelectorProps, 
  Tag 
} from '@/lib/ui-library';

// Importar proveedor de tema
import { ThemeProvider, useTheme } from '@/lib/ui-library/theme';

// Los estilos globales ya están configurados en:
// client/src/index.css (Tailwind + variables CSS)`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">⚙️ Configuración con Temas</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// App.tsx - Configuración con ThemeProvider
import { ThemeProvider } from '@/lib/ui-library/theme';

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
{`// Componente de ejemplo
import { useState } from 'react';
import { Button, TagSelector } from '@/lib/ui-library';
import type { Tag } from '@/lib/ui-library';

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
          <h4 className="text-md font-medium text-foreground mb-3">🎨 Control de Temas</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// Usar el hook de temas
import { useTheme } from '@/lib/ui-library/theme';

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