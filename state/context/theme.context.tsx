"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Theme;
}

export function ThemeProvider({
  children,
  initialTheme = "dark",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);

    // Update DOM
    if (newTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }

    // Update Cookie (expires in 1 year)
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Sync state with DOM on mount
  useEffect(() => {
    if (
      theme === "light" &&
      !document.documentElement.classList.contains("light")
    ) {
      document.documentElement.classList.add("light");
    } else if (
      theme === "dark" &&
      document.documentElement.classList.contains("light")
    ) {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
