type ThemeHook = () => { theme: 'light' | 'dark' };
declare const useTheme: ThemeHook;
const FallbackTheme: ThemeHook = () => ({ theme: 'light' });

export function useThemeSafe() {
  try { return (useTheme ?? FallbackTheme)(); } catch { return FallbackTheme(); }
}
