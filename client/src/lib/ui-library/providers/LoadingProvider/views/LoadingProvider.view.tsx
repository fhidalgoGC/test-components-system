import { createContext, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Loading } from '../../../components/Loading';
import type { LoadingContextValue, LoadingProviderProps, LoadingConfig } from '../types';

export const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({
  children,
  defaultOverlay = 'transparent',
  defaultSize = 'lg',
  defaultLabelI18n,
}: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<LoadingConfig>({
    overlay: defaultOverlay,
    size: defaultSize,
    labelI18n: defaultLabelI18n,
  });
  const originalPositionRef = useRef<string | null>(null);
  const activeParentRef = useRef<HTMLElement | null>(null);

  const restoreParentPosition = useCallback(() => {
    if (activeParentRef.current && originalPositionRef.current !== null) {
      activeParentRef.current.style.position = originalPositionRef.current;
    }
    activeParentRef.current = null;
    originalPositionRef.current = null;
  }, []);

  const show = useCallback((overrides?: LoadingConfig) => {
    restoreParentPosition();

    const newConfig: LoadingConfig = {
      overlay: defaultOverlay,
      size: defaultSize,
      labelI18n: defaultLabelI18n,
      ...overrides,
    };

    if (newConfig.parentRef?.current) {
      const el = newConfig.parentRef.current;
      const computed = window.getComputedStyle(el).position;
      originalPositionRef.current = el.style.position || '';
      activeParentRef.current = el;
      if (computed === 'static' || computed === '') {
        el.style.position = 'relative';
      }
    }

    setConfig(newConfig);
    setIsLoading(true);
  }, [defaultOverlay, defaultSize, defaultLabelI18n, restoreParentPosition]);

  const hide = useCallback(() => {
    restoreParentPosition();
    setIsLoading(false);
  }, [restoreParentPosition]);

  const contextValue: LoadingContextValue = {
    isLoading,
    show,
    hide,
    config,
  };

  const renderLoading = () => {
    if (!isLoading) return null;

    const loadingElement = (
      <Loading
        state="loading"
        overlay={config.overlay}
        coverage={config.parentRef?.current ? 'component' : 'fullscreen'}
        size={config.size}
        labelI18n={config.labelI18n}
        renderType={config.renderType}
        render={config.render}
      />
    );

    if (config.parentRef?.current) {
      return createPortal(loadingElement, config.parentRef.current);
    }

    return loadingElement;
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      {renderLoading()}
    </LoadingContext.Provider>
  );
}
