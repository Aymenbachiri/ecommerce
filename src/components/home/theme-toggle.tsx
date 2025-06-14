"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNextTheme } from "@/lib/hooks/use-next-theme";

export function ThemeToggle(): React.JSX.Element | null {
  const { theme, mounted, toggle } = useNextTheme();
  if (!mounted) return null;

  return (
    <Button
      onClick={toggle}
      className="cursor-pointer rounded-full p-2 transition-transform hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
