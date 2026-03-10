import type { ReactNode, ComponentType } from 'react';
import type { GridStateComponent } from '../types';

export function renderStateContent(
  config: GridStateComponent | undefined,
  fallback: ReactNode
): ReactNode {
  if (!config) return fallback;
  if (config.renderType === 'self') return fallback;
  if (config.renderType === 'component' && config.render) {
    if (typeof config.render === 'function') {
      const Component = config.render as ComponentType;
      return <Component />;
    }
    return config.render as ReactNode;
  }
  return fallback;
}
