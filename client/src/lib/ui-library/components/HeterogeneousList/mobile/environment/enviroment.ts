// Component-specific environment configuration (flat structure)
// Local access: environment.PROPERTY_NAME
// ConfigProvider access: optionalConfig?.environment?.HETEROGENEOUS_LIST_CONFIG?.PROPERTY_NAME
//
// Environment variables pattern:
// - Use import.meta.env.VITE_HETEROGENEOUS_LIST_PROPERTY_NAME to read from .env
// - Example: import.meta.env.VITE_HETEROGENEOUS_LIST_PAGE_SIZE === "20" || 20

export const environment = {
  // Default page size for infinite scroll
  DEFAULT_PAGE_SIZE: 
    parseInt(import.meta.env.VITE_HETEROGENEOUS_LIST_PAGE_SIZE as string) || 20,
  
  // Default preserve scroll position
  DEFAULT_PRESERVE_SCROLL: 
    import.meta.env.VITE_HETEROGENEOUS_LIST_PRESERVE_SCROLL === "true" || true,
};
