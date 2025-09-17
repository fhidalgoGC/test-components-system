import type { ComponentInfo, LibraryFeature } from './LibraryDashboard.types';

// Fixed icon mapping to avoid dynamic Tailwind class generation
const iconColorClasses = {
  'text-primary': 'bg-primary/10',
  'text-purple-500': 'bg-purple-500/10', 
  'text-orange-500': 'bg-orange-500/10',
  'text-blue-500': 'bg-blue-500/10',
  'text-green-500': 'bg-green-500/10',
  'text-muted-foreground': 'bg-muted'
} as const;

export const getIconBgClass = (iconColor: string): string => {
  return iconColorClasses[iconColor as keyof typeof iconColorClasses] || 'bg-muted';
};

export const getAvailableComponents = (): ComponentInfo[] => [
  {
    name: 'Button',
    description: 'Interactive button component',
    icon: 'mouse-pointer', // Using lucide-react icon name
    iconColor: 'text-primary',
    features: [
      '• Multiple sizes (sm, md, lg)',
      '• Intent variants (primary, secondary, danger)',
      '• Loading and disabled states'
    ],
    href: '/components/button'
  },
  {
    name: 'TagSelector',
    description: 'Multi-selection tag component',
    icon: 'tags', // Using lucide-react icon name
    iconColor: 'text-purple-500',
    features: [
      '• Single/multi selection modes',
      '• Customizable tag styles',
      '• "Select All" functionality'
    ],
    href: '/components/tag-selector'
  }
];

export const getComingSoonComponents = (): ComponentInfo[] => [
  {
    name: 'TextField',
    description: 'Input field component',
    icon: 'edit', // Using lucide-react icon name
    iconColor: 'text-muted-foreground',
    features: [],
    href: '#'
  },
  {
    name: 'Card',
    description: 'Container component',
    icon: 'square', // Using lucide-react icon name
    iconColor: 'text-muted-foreground',
    features: [],
    href: '#'
  },
  {
    name: 'Modal',
    description: 'Dialog component',
    icon: 'maximize', // Using lucide-react icon name
    iconColor: 'text-muted-foreground',
    features: [],
    href: '#'
  }
];

export const getLibraryFeatures = (): LibraryFeature[] => [
  {
    name: 'Automatic Theming',
    description: 'Dark/light theme support',
    icon: 'palette', // Using lucide-react icon name
    iconColor: 'text-orange-500'
  },
  {
    name: 'Internationalization',
    description: 'Local-first i18n support',
    icon: 'languages', // Using lucide-react icon name
    iconColor: 'text-blue-500'
  },
  {
    name: 'Responsive Design',
    description: 'Device-aware visibility',
    icon: 'smartphone', // Using lucide-react icon name
    iconColor: 'text-green-500'
  },
  {
    name: 'Modular Architecture',
    description: 'Tree-shakable imports',
    icon: 'puzzle', // Using lucide-react icon name
    iconColor: 'text-purple-500'
  }
];

export const getCodeExamples = () => ({
  installation: `npm install @fremitech/ui`,
  basicUsage: `import { Button } from '@fremitech/ui';

<Button intent="primary">
  Click me
</Button>`,
  reactIntegration: `// Install the library
npm install @fremitech/ui

// Setup theme provider
import { ThemeProvider } from '@fremitech/ui';

function App() {
  return (
    <ThemeProvider>
      <YourComponents />
    </ThemeProvider>
  );
}

// Use components
import { Button, TagSelector } from '@fremitech/ui';

export function MyComponent() {
  return (
    <div>
      <Button intent="primary" size="md">
        Primary Action
      </Button>
      
      <TagSelector
        tags={[
          { id: '1', label: 'React' },
          { id: '2', label: 'TypeScript' }
        ]}
        selectedTags={[]}
        onSelectionChange={(tags) => console.log(tags)}
      />
    </div>
  );
}`,
  htmlStructure: `<!-- Component Library HTML Structure -->
<div class="ui-library">
  <!-- Button Component -->
  <button class="btn btn-primary btn-md">
    Primary Button
  </button>
  
  <!-- TagSelector Component -->
  <div class="tag-selector">
    <button class="tag tag-selected">Selected Tag</button>
    <button class="tag">Available Tag</button>
  </div>
  
  <!-- Component with Theme -->
  <div class="ui-component" data-theme="dark">
    <button class="btn btn-secondary">
      Themed Button
    </button>
  </div>
</div>

<!-- CSS Classes -->
.btn { /* Base button styles */ }
.btn-primary { /* Primary variant */ }
.btn-secondary { /* Secondary variant */ }
.btn-sm, .btn-md, .btn-lg { /* Size variants */ }

.tag-selector { /* Container styles */ }
.tag { /* Individual tag styles */ }
.tag-selected { /* Selected state */ }`,
  cssVariables: `/* Theme Variables */
:root {
  --primary: 210 100% 50%;
  --secondary: 210 11% 15%;
  --accent: 210 11% 11%;
  --muted: 217 33% 17%;
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
  --border: 216 34% 17%;
  --ring: 216 34% 17%;
}

/* Light Theme */
:root.light {
  --primary: 210 100% 50%;
  --secondary: 210 17% 98%;
  --accent: 210 17% 95%;
  --muted: 210 17% 95%;
  --background: 0 0% 100%;
  --foreground: 224 71% 4%;
  --border: 214 32% 91%;
  --ring: 215 25% 27%;
}

/* Component Styles */
.btn {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--border));
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.btn:hover {
  background: hsl(var(--primary) / 0.9);
  transform: translateY(-1px);
}

/* Responsive Breakpoints */
@media (max-width: 768px) {
  .btn { font-size: 0.875rem; }
}

@media (max-width: 640px) {
  .tag-selector { flex-wrap: wrap; }
}`
});