import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CodePreviewProps } from '../types/CodePreview.types';
import { useCodePreview } from '../hooks';
import { generateCode } from '../utils/CodePreview.utils';
import styles from '../css/CodePreview.module.css';

export const CodePreviewView: React.FC<CodePreviewProps> = ({
  componentName,
  props,
  titleKey,
  descriptionKey,
  title,
  description,
  className = ""
}) => {
  const { displayTitle, displayDescription } = useCodePreview({
    componentName,
    props,
    titleKey,
    descriptionKey,
    title,
    description
  });

  const generatedCode = generateCode(componentName, props);

  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground">{displayTitle}</h3>
          <p className="text-sm text-muted-foreground">{displayDescription}</p>
        </div>
        <div className="p-6">
          <div className={styles.codeContainer}>
            <code className={styles.codeBlock}>
              {generatedCode}
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};