export default function UsageDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Guía de Instalación y Uso</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Aprende cómo instalar e integrar el sistema de componentes en tu proyecto.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium text-foreground mb-3">📦 Instalación desde NPM</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`# Instalar el paquete
npm install @fremitech/ui-library

# O con yarn  
yarn add @fremitech/ui-library

# O con pnpm
pnpm add @fremitech/ui-library`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">🔗 Instalación desde GitHub</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`# Clonar el repositorio
git clone https://github.com/fremitech/ui-library.git

# Instalar desde el repositorio directamente  
npm install git+https://github.com/fremitech/ui-library.git

# O una versión específica/rama
npm install git+https://github.com/fremitech/ui-library.git#v1.0.0
npm install git+https://github.com/fremitech/ui-library.git#main`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">📋 Importaciones Necesarias</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// Importar los componentes principales
import { 
  Button, 
  TagSelector,
  LibraryDashboard 
} from '@fremitech/ui-library';

// Importar el proveedor de tema (obligatorio)
import { ThemeProvider } from '@fremitech/ui-library/theme';

// Importar estilos CSS (obligatorio)
import '@fremitech/ui-library/styles.css';

// Importar hooks personalizados
import { 
  useLibraryDashboard,
  useTheme 
} from '@fremitech/ui-library/hooks';`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">⚙️ Configuración Inicial</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// App.tsx - Configuración principal
import { ThemeProvider } from '@fremitech/ui-library/theme';
import '@fremitech/ui-library/styles.css';

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
import { Button, TagSelector } from '@fremitech/ui-library';

export function MyComponent() {
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <div>
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
        tags={[
          { id: '1', label: 'React' },
          { id: '2', label: 'TypeScript' },
          { id: '3', label: 'Tailwind' }
        ]}
        selectedTags={selectedTags}
        onSelectionChange={setSelectedTags}
        allowMultiple={true}
      />
    </div>
  );
}`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">🌐 Internacionalización</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`// Usar el hook de internacionalización
import { useLibraryDashboard } from '@fremitech/ui-library/hooks';

export function InternationalComponent() {
  const { language, t, changeLanguage } = useLibraryDashboard();

  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
      
      {/* Botones para cambiar idioma */}
      <button onClick={() => changeLanguage('en')}>
        English
      </button>
      <button onClick={() => changeLanguage('es')}>
        Español
      </button>
      
      <p>Idioma actual: {language}</p>
    </div>
  );
}`}
            </pre>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-3">🎨 Personalización de Temas</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
{`/* En tu archivo CSS personalizado */
:root {
  /* Personalizar colores primarios */
  --primary: 210 100% 50%;
  --primary-foreground: 0 0% 100%;
  
  /* Personalizar colores de fondo */
  --background: 0 0% 100%;
  --foreground: 224 71% 4%;
  
  /* Personalizar colores de acento */
  --accent: 210 17% 95%;
  --accent-foreground: 222 47% 11%;
}

/* Tema oscuro */
.dark {
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
  --accent: 216 34% 17%;
  --accent-foreground: 210 40% 98%;
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}