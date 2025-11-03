// Component-specific environment configuration (flat structure)
// Local access: environment.PROPERTY_NAME
// ConfigProvider access: optionalConfig?.environment?.CAROUSEL_CONFIG?.PROPERTY_NAME
//
// Environment variables pattern:
// - Use import.meta.env.VITE_CAROUSEL_PROPERTY_NAME to read from .env
// - Example: import.meta.env.VITE_CAROUSEL_TRIGGER_ON_MOUNT === "true" || false

export const environment = {
  // Add your component-specific configuration properties here
  // Example with environment variable support:
  // TRIGGER_ON_MOUNT: import.meta.env.VITE_CAROUSEL_TRIGGER_ON_MOUNT === "true" || false,
  //
  // Example with static default:
  // SOME_CONFIG: false,
};
