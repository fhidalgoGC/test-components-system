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
          <h4 className="text-md font-medium text-foreground mb-3">📋 Importaciones Simples</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// Todo incluido - sin configuración adicional
import { 
  Button, 
  TagSelector, 
  ThemeProvider, 
  useTheme 
} from '@fremitech/ui-library';

// Tipos TypeScript incluidos
import type { 
  ButtonProps, 
  TagSelectorProps, 
  Tag 
} from '@fremitech/ui-library';

// ✅ Estilos incluidos automáticamente
// ✅ Temas claro/oscuro incluidos
// ✅ Internacionalización incluida
// ✅ Sin setup adicional requerido`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">⚙️ Configuración Mínima</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// App.tsx - Solo envolver con ThemeProvider
import { ThemeProvider } from '@fremitech/ui-library';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        {/* Tus componentes aquí */}
        <MyComponents />
      </div>
    </ThemeProvider>
  );
}

export default App;

// ¡Eso es todo! Sin configuración adicional.`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">🚀 Uso Inmediato</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// Listo para usar - estilos incluidos
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
    <div>
      {/* Funciona inmediatamente */}
      <Button 
        intent="primary" 
        size="md"
        onClick={() => console.log('Clicked!')}
      >
        Acción Principal
      </Button>

      {/* Estilos y temas incluidos */}
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
{`// Temas incluidos - funciona inmediatamente
import { useTheme } from '@fremitech/ui-library';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Tema actual: {theme}</p>
      <button onClick={toggleTheme}>
        Cambiar a {theme === 'light' ? 'oscuro' : 'claro'}
      </button>
    </div>
  );
}

// ✅ Temas claro/oscuro incluidos
// ✅ Transiciones automáticas
// ✅ Persistencia en localStorage`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">🌐 API de Componentes</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// Button - Completamente estilizado
interface ButtonProps {
  intent?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string; // Para personalización opcional
}

// TagSelector - Listo para usar
interface TagSelectorProps {
  tags: Tag[];
  selectedTags: string[];
  onSelectionChange: (tags: string[]) => void;
  allowMultiple?: boolean;
  allowAll?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string; // Para personalización opcional
}

// Tag - Estructura simple
interface Tag {
  id: string;
  label: string;
}`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">🎨 Personalización (Opcional)</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// Personalización con className (opcional)
import { Button } from '@fremitech/ui-library';

// Estilos básicos incluidos - personaliza si necesitas
<Button 
  intent="primary"
  className="my-custom-styles"
>
  Botón Personalizado
</Button>

// O simplemente usa los estilos por defecto
<Button intent="primary">
  Botón Listo
</Button>

// ✅ Estilos completos incluidos
// ✅ Temas adaptativos automáticos 
// ✅ Responsive por defecto
// ✅ Accesibilidad incluida`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}