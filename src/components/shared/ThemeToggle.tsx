
"use client";

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeProvider';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null until mounted to avoid hydration mismatch
    return <Button variant="ghost" size="icon" className="w-9 h-9 text-accent-details" disabled><Sun className="h-[1.2rem] w-[1.2rem]" /></Button>;
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="w-9 h-9 text-accent-details hover:text-accent-details/80">
      {theme === 'light' ? (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
    </Button>
  );
}
