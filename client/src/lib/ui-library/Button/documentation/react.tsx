import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ReactDocProps {
  componentName?: string;
  basicExample?: string;
  advancedExample?: string;
  propsInterface?: string;
  importStatement?: string;
}

export default function ReactDoc({ 
  componentName = "Button",
  basicExample = `export function BasicButton() {
  return (
    <Button 
      intent="primary" 
      size="md"
      onClick={() => console.log('Clicked!')}
    >
      Click Me
    </Button>
  );
}`,
  advancedExample = `export function AdvancedButton() {
  const [loading, setLoading] = React.useState(false);
  
  const handleClick = async () => {
    setLoading(true);
    try {
      await someAsyncAction();
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Button
      intent="primary"
      size="lg"
      disabled={loading}
      onClick={handleClick}
      className="custom-class"
    >
      Submit Form
    </Button>
  );
}`,
  propsInterface = `interface ButtonProps {
  intent?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}`,
  importStatement = `import { Button } from '@fremitech/ui';`
}: ReactDocProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">React Implementation</h3>
            <p className="text-sm text-muted-foreground">Complete React component code and usage</p>
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
              <h4 className="text-sm font-medium text-foreground mb-2">Advanced Usage</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {advancedExample}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}