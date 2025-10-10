/**
 * TagSelector Environment Configuration
 * Flat structure - all properties at root level
 */

export const environment = {
  // Default size for tags
  DEFAULT_SIZE: import.meta.env.VITE_TAG_SELECTOR_DEFAULT_SIZE || 'md',
  
  // Allow multiple selection by default
  ALLOW_MULTIPLE: import.meta.env.VITE_TAG_SELECTOR_ALLOW_MULTIPLE !== 'false',
  
  // Show "All" option by default
  ALLOW_ALL: import.meta.env.VITE_TAG_SELECTOR_ALLOW_ALL !== 'false',
  
  // Require at least one selection
  REQUIRE_SELECTION: import.meta.env.VITE_TAG_SELECTOR_REQUIRE_SELECTION === 'true',
  
  // i18n order preference
  I18N_ORDER: (import.meta.env.VITE_TAG_SELECTOR_I18N_ORDER || 'local-first') as 'global-first' | 'local-first',
} as const;
