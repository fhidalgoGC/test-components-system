import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useHierarchicalTranslations } from '@/i18n';
import { componentsTranslations } from './i18n';

export interface CodePreviewProps {
  componentName: string;
  props: Array<{
    name: string;
    value: string;
    comment?: string;
  }>;
  titleKey?: string;
  descriptionKey?: string;
  title?: string;
  description?: string;
}

export const CodePreview: React.FC<CodePreviewProps> = ({
  componentName,
  props,
  titleKey = "codePreview.generatedCode",
  descriptionKey = "codePreview.copyCodeDescription",
  title,
  description
}) => {
  const { t } = useHierarchicalTranslations(componentsTranslations);
  const generateCode = () => {
    const propStrings = props.map(prop => {
      const line = `${prop.name}={${prop.value}}`;
      return prop.comment ? `${line} // ${prop.comment}` : line;
    });
    
    return `<${componentName}\n  ${propStrings.join('\n  ')}\n/>`;
  };

  const displayTitle = title || t(titleKey) || "Generated Code";
  const displayDescription = description || t(descriptionKey) || "Copy this code to use with current settings";

  return (
    <Card>
      <CardContent className="p-0">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground">{displayTitle}</h3>
          <p className="text-sm text-muted-foreground">{displayDescription}</p>
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