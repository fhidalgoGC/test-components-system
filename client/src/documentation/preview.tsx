import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PreviewProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  showCode?: boolean;
  codeExample?: string;
}

export default function Preview({ 
  title = "Live Demo", 
  description = "Interactive component preview",
  children,
  showCode = false,
  codeExample = ""
}: PreviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="p-6">
            <div className="min-h-32 bg-muted/50 rounded-lg border-2 border-dashed border-border p-6 flex items-center justify-center">
              {children}
            </div>
          </div>
        </CardContent>
      </Card>

      {showCode && codeExample && (
        <Card>
          <CardContent className="p-0">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground">Code Example</h3>
              <p className="text-sm text-muted-foreground">Current configuration</p>
            </div>
            <div className="p-6">
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground whitespace-pre-wrap">
                  {codeExample}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}