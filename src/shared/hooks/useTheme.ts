import { useContext } from 'react';
import { ThemeContext, type ThemeContextValue } from '@/shared/context/themeContextDef';

/**
 * Returns the current theme state and toggle function.
 * Must be used inside <ThemeProvider>.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return ctx;
}
