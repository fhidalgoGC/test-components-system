import { PropInfo, PropsTableConfig } from '../types/PropsTable.types';

export const validatePropInfo = (prop: PropInfo): boolean => {
  return !!(prop.name && prop.description && 
           typeof prop.name === 'string' && 
           typeof prop.description === 'string');
};

export const filterValidProps = (props: PropInfo[]): PropInfo[] => {
  return props.filter(validatePropInfo);
};

export const sortPropsByName = (props: PropInfo[]): PropInfo[] => {
  return [...props].sort((a, b) => a.name.localeCompare(b.name));
};

export const limitProps = (props: PropInfo[], maxItems?: number): PropInfo[] => {
  if (!maxItems || maxItems <= 0) return props;
  return props.slice(0, maxItems);
};

export const processProps = (
  props: PropInfo[], 
  config: PropsTableConfig = {}
): PropInfo[] => {
  let processed = filterValidProps(props);
  processed = sortPropsByName(processed);
  processed = limitProps(processed, config.maxItems);
  return processed;
};