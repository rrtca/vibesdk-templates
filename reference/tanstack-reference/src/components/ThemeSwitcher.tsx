import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";

type Theme = "default" | "terminal" | "c64";

const themes: { value: Theme; label: string }[] = [
  { value: "default", label: "Slate/Navy" },
  { value: "terminal", label: "Terminal Green" },
  { value: "c64", label: "Commodore 64" },
];

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>("default");

  useEffect(() => {
    const saved = localStorage.getItem("color-theme") as Theme | null;
    if (saved && themes.some((t) => t.value === saved)) {
      setCurrentTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    // Remove all theme classes
    root.classList.remove("theme-terminal", "theme-c64");
    // Apply new theme if not default
    if (theme !== "default") {
      root.classList.add(`theme-${theme}`);
    }
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    localStorage.setItem("color-theme", theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Switch theme palette</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => handleThemeChange(theme.value)}
            className={currentTheme === theme.value ? "bg-accent" : ""}
          >
            {theme.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
