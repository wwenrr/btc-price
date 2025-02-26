'use client'

import { useEffect, useState, useContext } from "react"
import { ThemeContext } from "@/app/layout";

export function Theme() {
    const context = useContext(ThemeContext);
        if (!context) {
        throw new Error("useContext phải được dùng bên trong ThemeContext.Provider");
    }

    const { theme, toggleTheme } = context;

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

    return (
        <>
            <div onClick={() => {toggleTheme()
                //@ts-ignore
            }} style={{position: "absolute", right: 30, top: 30, cursor: "pointer", zIndex: 5}}>
                {!theme ? <img src="https://cdn-icons-png.flaticon.com/128/243/243388.png" width={55} height={55} alt="" />
                :     <img src="https://cdn-icons-png.flaticon.com/128/12301/12301351.png" width={55} height={55} alt="" />
            }
            </div>
        </>
    )
}