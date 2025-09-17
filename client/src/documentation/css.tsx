import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CSSDocProps {
  componentName: string;
  baseStyles?: string;
  variables?: { name: string; value: string; description: string }[];
  modifiers?: { name: string; styles: string; description: string }[];
  customization?: string;
}

export default function CSSDoc({ 
  componentName,
  baseStyles = "",
  variables = [],
  modifiers = [],
  customization = ""
}: CSSDocProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">CSS Styles</h3>
            <p className="text-sm text-muted-foreground">Component styling, CSS classes, and customization</p>
          </div>
          <div className="p-6 space-y-6">
            {/* Base Styles */}
            {baseStyles && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Base Styles</h4>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <code className="text-muted-foreground whitespace-pre">
                    {baseStyles}
                  </code>
                </div>
              </div>
            )}

            {/* CSS Variables */}
            {variables.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">CSS Variables</h4>
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Variable
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Default Value
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {variables.map((variable, index) => (
                        <tr key={index} className="border-t border-border">
                          <td className="px-4 py-2 font-mono text-sm text-foreground">--{variable.name}</td>
                          <td className="px-4 py-2 font-mono text-sm text-muted-foreground">{variable.value}</td>
                          <td className="px-4 py-2 text-sm text-muted-foreground">{variable.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Modifiers/Classes */}
            {modifiers.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Modifier Classes</h4>
                <div className="space-y-4">
                  {modifiers.map((modifier, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-mono text-sm text-foreground">.{modifier.name}</h5>
                        <span className="text-xs text-muted-foreground">{modifier.description}</span>
                      </div>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <code className="text-muted-foreground whitespace-pre">
                          {modifier.styles}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Customization */}
            {customization && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Customization</h4>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <code className="text-muted-foreground whitespace-pre">
                    {customization}
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