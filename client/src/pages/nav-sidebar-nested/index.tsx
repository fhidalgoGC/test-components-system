import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { LibI18nProvider, useLibI18n } from '@/lib/ui-library/providers';
import { Home, Package, Settings, Layout, MousePointer, Tag, Calendar } from 'lucide-react';
import { useState } from 'react';
import styles from './css/NavSidebarNested.module.scss';

const menuItems = [
  { 
    id: 'home', 
    label: 'Home', 
    i18n: { en: 'Home', es: 'Inicio', default: 'Home' },
    path: '/home', 
    icon: <Home className="h-5 w-5" /> 
  },
  {
    id: 'components',
    label: 'Components',
    i18n: { en: 'Components', es: 'Componentes', default: 'Components' },
    icon: <Package className="h-5 w-5" />,
    children: [
      { 
        id: 'button', 
        label: 'Button', 
        i18n: { en: 'Button', es: 'Botón', default: 'Button' },
        path: '/components/button', 
        icon: <MousePointer className="h-4 w-4" /> 
      },
      { 
        id: 'card', 
        label: 'Card', 
        i18n: { en: 'Card', es: 'Tarjeta', default: 'Card' },
        path: '/components/card', 
        icon: <Layout className="h-4 w-4" /> 
      },
      { 
        id: 'carousel', 
        label: 'Carousel', 
        i18n: { en: 'Carousel', es: 'Carrusel', default: 'Carousel' },
        path: '/components/carousel',
        component: (
          <div className="flex items-center gap-2">
            <span>Carousel</span>
            <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">New</span>
          </div>
        )
      },
      { 
        id: 'tag', 
        label: 'TagSelector', 
        i18n: { en: 'Tag Selector', es: 'Selector de Etiquetas', default: 'Tag Selector' },
        path: '/components/tag', 
        icon: <Tag className="h-4 w-4" /> 
      },
    ],
  },
  {
    id: 'utilities',
    label: 'Utilities',
    i18n: { en: 'Utilities', es: 'Utilidades', default: 'Utilities' },
    icon: <Settings className="h-5 w-5" />,
    children: [
      { 
        id: 'calendar', 
        label: 'Calendar', 
        i18n: { en: 'Calendar', es: 'Calendario', default: 'Calendar' },
        path: '/utilities/calendar', 
        icon: <Calendar className="h-4 w-4" /> 
      },
      { 
        id: 'settings', 
        label: 'Settings', 
        i18n: { en: 'Settings', es: 'Configuración', default: 'Settings' },
        path: '/utilities/settings' 
      },
    ],
  },
];

const quickNavOptions = [
  { path: '/home', label: 'Inicio' },
  { path: '/components/button', label: 'Button' },
  { path: '/components/card', label: 'Card' },
  { path: '/components/carousel', label: 'Carousel' },
  { path: '/components/tag', label: 'TagSelector' },
  { path: '/utilities/calendar', label: 'Calendario' },
  { path: '/utilities/settings', label: 'Configuración' },
];

function NavSidebarContent() {
  const [selectedPath, setSelectedPath] = useState('/home');
  const { lang } = useLibI18n();

  const handleNavigate = (path: string) => {
    setSelectedPath(path);
    console.log('Navigate to:', path);
  };

  const handleExternalNavigation = (path: string) => {
    setSelectedPath(path);
    console.log('External navigation to:', path);
  };

  return (
    <div className={styles.pageContainer}>
      <NavigationSidebar
        items={menuItems}
        currentPath={selectedPath}
        onNavigate={handleNavigate}
      />
      <div className={styles.contentArea}>
        <h1 className={styles.pageTitle}>Control Externo del Menú</h1>
        <p className={styles.pageDescription}>
          Este ejemplo demuestra cómo cambiar el item seleccionado desde fuera del menú usando botones externos.
        </p>
        
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Estado actual:</h3>
          <p className={styles.currentPath}>{selectedPath}</p>
          <p className={styles.helpText}>
            Idioma actual: <strong>{lang.toUpperCase()}</strong>
          </p>
        </div>

        <div className={styles.cardLarge}>
          <h3 className={styles.cardTitleLarge}>Navegación Externa (Botones)</h3>
          <p className={styles.helpText}>
            Haz clic en cualquier botón para cambiar el item seleccionado en el menú:
          </p>
          <div className={styles.buttonsContainer}>
            {quickNavOptions.map((option) => (
              <button
                key={option.path}
                onClick={() => handleExternalNavigation(option.path)}
                className={selectedPath === option.path ? styles.navButtonActive : styles.navButtonDefault}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.cardLarge}>
          <h3 className={styles.cardTitleLarge}>Navegación con Select</h3>
          <div className={styles.selectContainer}>
            <select
              value={selectedPath}
              onChange={(e) => handleExternalNavigation(e.target.value)}
              className={styles.selectInput}
            >
              {quickNavOptions.map((option) => (
                <option key={option.path} value={option.path}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h3 className={styles.infoTitle}>Cómo funciona</h3>
          <div className={styles.infoContent}>
            <div className={styles.infoList}>
              <p><strong>1.</strong> El estado <code className={styles.codeInline}>selectedPath</code> se maneja en el componente padre.</p>
              <p><strong>2.</strong> Se pasa a NavigationSidebar como <code className={styles.codeInline}>currentPath</code> prop.</p>
              <p><strong>3.</strong> Los botones externos llaman <code className={styles.codeInline}>setSelectedPath()</code> directamente.</p>
              <p><strong>4.</strong> El menú reacciona automáticamente al cambio de estado.</p>
            </div>
          </div>
          <div className={styles.codeBlock}>
            <pre className={styles.codeContent}>
{`const [selectedPath, setSelectedPath] = useState('/home');

// Botón externo cambia el estado
<button onClick={() => setSelectedPath('/components/carousel')}>
  Ir a Carousel
</button>

// El menú recibe el estado
<NavigationSidebar
  items={menuItems}
  currentPath={selectedPath}  // ← Controlado externamente
  onNavigate={setSelectedPath}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NavSidebarNestedPage() {
  return (
    <LibI18nProvider>
      <NavSidebarContent />
    </LibI18nProvider>
  );
}
