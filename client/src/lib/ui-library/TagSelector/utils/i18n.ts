export type TranslationOrder = 'global-first' | 'local-first';

export function interpolate(template: string, params?: Record<string, string | number>) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? `{${k}}`));
}

export function makeTranslator(
  local?: Record<string, string>,
  global?: Record<string, string>,
  order: TranslationOrder = 'local-first' // ⬅️ now local-first by default
) {
  return (key: string, params?: Record<string, string | number>) => {
    let value: string | undefined;
    if (order === 'global-first') {
      value = global?.[key] ?? local?.[key];
    } else {
      value = local?.[key] ?? global?.[key];
    }
    return interpolate(value ?? key, params);
  };
}