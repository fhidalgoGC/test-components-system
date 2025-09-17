export default function ReactDoc() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">React Implementation</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This component demonstrates a modular React page structure with internationalization and icon integration.
        </p>
      </div>

      <div>
        <h4 className="text-md font-medium text-foreground mb-2">Basic Usage</h4>
        <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <code className="text-muted-foreground whitespace-pre">
{`import LibraryDashboard from '@/pages/library-dashboard';

export function App() {
  return (
    <div>
      <LibraryDashboard />
    </div>
  );
}`}
          </code>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-foreground mb-2">With Custom Props</h4>
        <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <code className="text-muted-foreground whitespace-pre">
{`import { LibraryDashboardView } from '@/pages/library-dashboard';

export function CustomDashboard() {
  return (
    <LibraryDashboardView 
      className="custom-dashboard-styles" 
    />
  );
}`}
          </code>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-foreground mb-2">Hooks Usage</h4>
        <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <code className="text-muted-foreground whitespace-pre">
{`import { useLibraryDashboard } from '@/pages/library-dashboard';

export function CustomComponent() {
  const { language, t, changeLanguage } = useLibraryDashboard();
  
  return (
    <div>
      <button onClick={() => changeLanguage(language === 'en' ? 'es' : 'en')}>
        Switch Language
      </button>
      <h1>{t.title}</h1>
    </div>
  );
}`}
          </code>
        </div>
      </div>
    </div>
  );
}