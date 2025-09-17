import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ReactDocProps {
  componentName: string;
  basicExample?: string;
  advancedExample?: string;
  propsInterface?: string;
  importStatement?: string;
}

export default function ReactDoc({ 
  componentName,
  basicExample = "",
  advancedExample = "",
  propsInterface = "",
  importStatement = `import { ${componentName} } from '@fremitech/ui';`
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
            {basicExample && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Basic Usage</h4>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <code className="text-muted-foreground whitespace-pre">
                    {basicExample}
                  </code>
                </div>
              </div>
            )}

            {/* Advanced Example */}
            {advancedExample && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Advanced Usage</h4>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <code className="text-muted-foreground whitespace-pre">
                    {advancedExample}
                  </code>
                </div>
              </div>
            )}

            {/* Props Interface */}
            {propsInterface && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Props Interface</h4>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <code className="text-muted-foreground whitespace-pre">
                    {propsInterface}
                  </code>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}