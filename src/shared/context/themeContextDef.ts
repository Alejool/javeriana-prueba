import { createContext } from 'react';

export interface ThemeContextValue {
  isDark: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

ThemeContext.displayName = 'ThemeContext';
