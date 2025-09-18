import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export interface CodePreviewProps {
  componentName: string;
  props: Array<{
    name: string;
    value: string;
    comment?: string;
  }>;
  title?: string;
  description?: string;
}

export const CodePreview: React.FC<CodePreviewProps> = ({
  componentName,
  props,
  title = "Generated Code",
  description = "Copy this code to use with current settings"
}) => {
  const generateCode = () => {
    const propStrings = props.map(prop => {
      const line = `${prop.name}={${prop.value}}`;
      return prop.comment ? `${line} // ${prop.comment}` : line;
    });
    
    return `<${componentName}\n  ${propStrings.join('\n  ')}\n/>`;
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="p-6">
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <code className="text-muted-foreground whitespace-pre">
              {generateCode()}
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodePreview;