'use client'

import { useEffect, useState, useContext } from "react"
import { ThemeContext } from "@/component/ThemeContext";

export function Theme() {
    const context = useContext(ThemeContext);
        if (!context) {
        throw new Error("useContext phải được dùng bên trong ThemeContext.Provider");
    }

    const { theme, toggleTheme } = context;

    return (
        <>
            <div onClick={() => {toggleTheme()
            }} style={{position: "absolute", right: 30, top: 30, cursor: "pointer", zIndex: 5}}>
                {!theme ? <img src="https://cdn-icons-png.flaticon.com/128/243/243388.png" width={55} height={55} alt="" />
                :     <img src="https://cdn-icons-png.flaticon.com/128/12301/12301351.png" width={55} height={55} alt="" />
            }
            </div>
        </>
    )
}