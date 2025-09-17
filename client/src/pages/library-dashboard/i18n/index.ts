export { en } from './en';
export { es } from './es';

export const i18n = {
  en: () => import('./en').then(m => m.en),
  es: () => import('./es').then(m => m.es),
};

export type Language = keyof typeof i18n;
export type Translation = typeof import('./en').en;