'use client'

import { useContext, createContext, useState, useEffect } from "react";
import "@/assets/style.scss"
import { Theme } from "@/component/Theme";

interface ThemeContextType {
  theme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState(null);

  //@ts-ignore
  const toggleTheme = () => setTheme((prev) => !prev);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== null) {
      //@ts-ignore
      setTheme(storedTheme === "true"); 
    }
  }, []);

  useEffect(() => {
    if (typeof theme !== "boolean") return;

    if(theme) {
        document.body.style.backgroundImage = 'url("https://img.freepik.com/free-vector/hand-drawn-winter-landscape_23-2149169698.jpg")';
    } else {
        document.body.style.backgroundImage = 'url("https://img.freepik.com/free-vector/wild-northern-island-coastline-cartoon-vector_1441-3159.jpg?t=st=1740597458~exp=1740601058~hmac=6e68131bb13954e398fe47b8333ac77db5d2d2af79157e2cf81c1db895e57d07&w=2000")';
    }
//@ts-ignore
    localStorage.setItem("theme", theme.toString()); 
  }, [theme])

  if (typeof theme !== "boolean") {
    return <div>Loading theme...</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <html lang="en">
        <body style={{position: "relative"}}>
          <Theme />
          {children}
        </body>
      </html>
    </ThemeContext.Provider>
  );
}
