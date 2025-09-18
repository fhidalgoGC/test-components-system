import { useState, useEffect } from 'react';
import { PropsTableState, PropsTableProps } from '../types/PropsTable.types';
import { useHierarchicalTranslations } from '@/i18n';
import { propsTableTranslations } from '../i18n';

export const usePropsTable = (props: PropsTableProps) => {
  const [state, setState] = useState<PropsTableState>({
    isLoaded: false
  });

  const { t } = useHierarchicalTranslations(propsTableTranslations);

  useEffect(() => {
    setState(prev => ({ ...prev, isLoaded: true }));
  }, []);

  const displayTitle = props.title || t(props.titleKey || 'propsTable.title') || "Component Props";
  const displayDescription = props.description || t(props.descriptionKey || 'propsTable.description') || "Properties available for this component";

  return {
    state,
    t,
    displayTitle,
    displayDescription
  };
};