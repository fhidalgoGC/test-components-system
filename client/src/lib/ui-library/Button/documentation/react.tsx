import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function ReactDoc() {
  const importStatement = `import Button from '@/lib/ui-library/Button';`;
  
  const basicExample = `export function BasicButton() {
  return (
    <Button 
      intent="primary" 
      size="md"
      onClick={() => console.log('Button clicked!')}
    >
      Click Me
    </Button>
  );
}`;

  const advancedExample = `export function AdvancedButton() {
  const [loading, setLoading] = React.useState(false);
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitForm();
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Failed to submit:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Button
      intent="danger"
      size="lg"
      disabled={loading}
      onClick={handleSubmit}
      className="w-full mt-4"
      titleKey="submit" // Uses i18n translation
    >
      {loading ? 'Submitting...' : 'Submit Form'}
    </Button>
  );
}`;

  const propsInterface = `interface ButtonProps {
  // Core Props
  id?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  
  // Button Specific
  intent?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  
  // Internationalization
  titleKey?: string; // Translation key for button text
  
  // Responsive Visibility
  config?: VisibilityConfig; // Controls responsive behavior
}`;

  const visibilityExample = `// Responsive visibility example
const visibilityConfig = {
  mobile: { portrait: true, landscape: false },
  tablet: { portrait: true, landscape: true },
  desktop: true
};

<Button 
  config={visibilityConfig}
  intent="secondary"
  size="md"
>
  Desktop/Tablet Only
</Button>`;

  const themingExample = `// Button automatically adapts to theme context
<ThemeProvider theme="dark">
  <Button intent="primary">Dark Theme Button</Button>
</ThemeProvider>

<ThemeProvider theme="light">
  <Button intent="primary">Light Theme Button</Button>
</ThemeProvider>`;

  const propExplanations = [
    { prop: 'intent', type: "'primary' | 'secondary' | 'danger'", default: "'primary'", description: 'Visual style variant of the button' },
    { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant affecting padding and font size' },
    { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables button interaction and shows disabled state' },
    { prop: 'onClick', type: '() => void', default: 'undefined', description: 'Click event handler function' },
    { prop: 'titleKey', type: 'string', default: "'primary'", description: 'i18n translation key for button text when no children provided' },
    { prop: 'config', type: 'VisibilityConfig', default: 'undefined', description: 'Responsive visibility configuration for different devices' },
    { prop: 'className', type: 'string', default: 'undefined', description: 'Additional CSS classes' },
    { prop: 'style', type: 'CSSProperties', default: 'undefined', description: 'Inline CSS styles' },
    { prop: 'id', type: 'string', default: 'undefined', description: 'HTML id attribute' }
  ];
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">React Implementation</h3>
            <p className="text-sm text-muted-foreground">Complete Button component documentation and usage patterns</p>
          </div>
          <div className="p-6 space-y-6">
            {/* Import Statement */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Import</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground">
                  {importStatement}
                </code>
              </div>
            </div>

            {/* Basic Example */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Basic Usage</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {basicExample}
                </code>
              </div>
            </div>

            {/* Advanced Example */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Advanced Usage with State</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {advancedExample}
                </code>
              </div>
            </div>

            {/* Responsive Visibility */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Responsive Visibility</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {visibilityExample}
                </code>
              </div>
            </div>

            {/* Theming */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Theme Integration</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {themingExample}
                </code>
              </div>
            </div>

            {/* Props Interface */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Props Interface</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {propsInterface}
                </code>
              </div>
            </div>

            {/* Props Documentation */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Props Documentation</h4>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Prop</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Default</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propExplanations.map((prop, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="px-4 py-2 font-mono text-sm text-foreground">{prop.prop}</td>
                        <td className="px-4 py-2 font-mono text-sm text-muted-foreground">{prop.type}</td>
                        <td className="px-4 py-2 font-mono text-sm text-muted-foreground">{prop.default}</td>
                        <td className="px-4 py-2 text-sm text-muted-foreground">{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}