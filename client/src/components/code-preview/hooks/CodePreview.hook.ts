import { useState, useEffect } from 'react';
import { CodePreviewState, CodePreviewProps } from '../types/CodePreview.types';
import { useHierarchicalTranslations } from '@/i18n';
import { codePreviewTranslations } from '../i18n';

export const useCodePreview = (props: CodePreviewProps) => {
  const [state, setState] = useState<CodePreviewState>({
    isCodeVisible: true,
    isLoaded: false
  });

  const { t } = useHierarchicalTranslations(codePreviewTranslations);

  useEffect(() => {
    setState(prev => ({ ...prev, isLoaded: true }));
  }, []);

  const displayTitle = props.title || t(props.titleKey || 'codePreview.generatedCode') || "Generated Code";
  const displayDescription = props.description || t(props.descriptionKey || 'codePreview.copyCodeDescription') || "Copy this code to use with current settings";

  const toggleCodeVisibility = () => {
    setState(prev => ({ ...prev, isCodeVisible: !prev.isCodeVisible }));
  };

  return {
    state,
    t,
    displayTitle,
    displayDescription,
    toggleCodeVisibility
  };
};