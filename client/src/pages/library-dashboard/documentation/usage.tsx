export default function UsageDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Usage Guide</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Complete guide on how to use and customize the Library Dashboard component.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium text-foreground mb-2">1. Basic Integration</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <code className="text-muted-foreground">
{`// Import the component
import LibraryDashboard from '@/pages/library-dashboard';

// Use in your router
<Route path="/dashboard" component={LibraryDashboard} />`}
            </code>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-2">2. Internationalization</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <code className="text-muted-foreground">
{`// Access translation hook
import { useLibraryDashboard } from '@/pages/library-dashboard';

function MyComponent() {
  const { language, t, changeLanguage } = useLibraryDashboard();
  
  return (
    <div>
      <h1>{t.title}</h1>
      <button onClick={() => changeLanguage('es')}>
        Español
      </button>
    </div>
  );
}`}
            </code>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-2">3. Custom Styling</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <code className="text-muted-foreground">
{`// Add custom CSS class
<LibraryDashboardView className="my-custom-dashboard" />

/* Custom styles */
.my-custom-dashboard .component-card {
  border: 2px solid var(--primary);
  border-radius: 12px;
}

.my-custom-dashboard .feature-icon {
  color: var(--accent-foreground);
}`}
            </code>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-2">4. Adding New Components</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <code className="text-muted-foreground">
{`// In LibraryDashboard.utils.ts
export const getAvailableComponents = (): ComponentInfo[] => [
  // existing components...
  {
    name: 'MyNewComponent',
    description: 'Custom component description',
    icon: 'new-icon', // lucide-react icon name
    iconColor: 'text-blue-500',
    features: [
      '• Custom feature 1',
      '• Custom feature 2'
    ],
    href: '/components/my-new-component'
  }
];`}
            </code>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-foreground mb-2">5. Extending Translations</h4>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <code className="text-muted-foreground">
{`// In i18n/en.ts
export const en = {
  title: 'Component Library Overview',
  description: 'React + TypeScript modular component system',
  // Add new keys
  mySection: {
    title: 'My Custom Section',
    description: 'Custom section description'
  }
};

// In i18n/es.ts  
export const es = {
  title: 'Resumen de Biblioteca de Componentes',
  description: 'Sistema de componentes modulares React + TypeScript',
  // Add translations
  mySection: {
    title: 'Mi Sección Personalizada', 
    description: 'Descripción de sección personalizada'
  }
};`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}