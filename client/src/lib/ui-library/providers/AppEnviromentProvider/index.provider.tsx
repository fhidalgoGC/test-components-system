import { useMemo } from "react";
import { ConfigProviderProps, ConfigContextType } from './index.types';
import { ConfigContext, useConfigState, useConfigHandlers } from './index.hook';

// Provider component
export function ConfigProvider({
  children,
  parentConfig = {},
  priority = "auto",
  enableOverrides = true,
}: ConfigProviderProps) {
  // Hook para manejar el estado de configuración
  const { config, setConfig } = useConfigState(parentConfig, priority, enableOverrides);

  // Hook para manejar las funciones
  const { updateConfig, resetConfig } = useConfigHandlers(
    setConfig,
    parentConfig,
    priority,
    enableOverrides
  );

  const contextValue = useMemo<ConfigContextType>(() => ({
    config,
    updateConfig,
    resetConfig,
    priority,
  }), [config, updateConfig, resetConfig, priority]);

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
}
