import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '@/shared/hooks/useDarkMode';
import { Button } from '@/shared/components/Button';

export function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <Button
      onClick={toggleDarkMode}
      variant="glass"
      size="icon"
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      {isDark ? (
        <Sun size={20} className="text-secondary-400" />
      ) : (
        <Moon size={20} className="text-secondary-300" />
      )}
    </Button>
  );
}
