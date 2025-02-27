'use client'

import { useContext, createContext, useState, useEffect } from "react";
import "@/assets/style.scss"
import { Theme } from "@/component/Theme";
import { ThemeProvider } from "@/component/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <ThemeProvider>
        <body style={{position: "relative"}}>
          <Theme />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
