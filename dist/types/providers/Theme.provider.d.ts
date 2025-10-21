import React from 'react';
import { tokens } from '../theme/tokens';
export declare const ThemeProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useTheme: () => {
    theme: "light" | "dark";
    tokens: typeof tokens;
    toggleTheme: () => void;
};
//# sourceMappingURL=Theme.provider.d.ts.map