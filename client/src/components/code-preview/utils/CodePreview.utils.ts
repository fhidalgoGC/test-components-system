import { CodeProp, CodePreviewConfig } from '../types/CodePreview.types';

export const validateCodeProp = (prop: CodeProp): boolean => {
  return !!(prop.name && prop.value && 
           typeof prop.name === 'string' && 
           typeof prop.value === 'string');
};

export const filterValidProps = (props: CodeProp[]): CodeProp[] => {
  return props.filter(validateCodeProp);
};

export const generateCode = (
  componentName: string, 
  props: CodeProp[], 
  config: CodePreviewConfig = {}
): string => {
  const validProps = filterValidProps(props);
  
  if (validProps.length === 0) {
    return `<${componentName} />`;
  }

  const propStrings = validProps.map(prop => {
    return `${prop.name}={${prop.value}}`;
  });
  
  return `<${componentName}\n  ${propStrings.join('\n  ')}\n/>`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackErr) {
      console.error('Failed to copy text to clipboard:', fallbackErr);
      return false;
    }
  }
};