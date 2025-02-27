// ThemeContext.ts
'use client'
import { createContext, useState, useEffect } from "react";

interface ThemeContextType {
  theme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<boolean | null>(null);

  const toggleTheme = () => setTheme((prev) => !prev);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== null) {
      setTheme(storedTheme === "true");
    }
    else setTheme(true)
  }, []);

  useEffect(() => {
    if (typeof theme !== "boolean") return;

    if (theme) {
      document.body.style.backgroundImage = 'url("https://img.freepik.com/free-vector/hand-drawn-winter-landscape_23-2149169698.jpg")';
    } else {
      document.body.style.backgroundImage = 'url("https://img.freepik.com/free-vector/wild-northern-island-coastline-cartoon-vector_1441-3159.jpg?t=st=1740597458~exp=1740601058~hmac=6e68131bb13954e398fe47b8333ac77db5d2d2af79157e2cf81c1db895e57d07&w=2000")';
    }

    localStorage.setItem("theme", theme.toString());
  }, [theme]);

  if (typeof theme !== "boolean") {
    return <div>Loading theme...</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};