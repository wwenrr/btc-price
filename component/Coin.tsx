"use client"
import { useState, useEffect, useContext } from "react";
import { cryptoCoins } from "@/lib/sample";
import { GetCryptoInfo } from "@/lib/sample";
import { ThemeContext } from "@/app/layout";
import Link from "next/link";

export default function Coin({coin}:{coin:any}) {
    
    const [isHovered, setIsHovered] = useState(false);
    const [price, setPrice] = useState(-1)

    useEffect(() => {
        (async () => {await updatePrice()})()
    }, [])

    const updatePrice = async () => {
        const res = await GetCryptoInfo(coin.cryptoName)

        //@ts-ignore
        setPrice(res.data.lastPrice)
    }

    return (
        <>
            <a href={`/${coin.cryptoName}`}
                onMouseEnter={() => {
                    setIsHovered(true);
                    updatePrice()
                    console.log("Hovering", coin.cryptoName);
                }}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                width: 140,
                height: 70,
                background: "linear-gradient(to bottom, #A1C4FD, #C2E9FB)",
                position: 'relative'
              }} className="listItem">
                <img src={coin.cryptoImage} width={45} height={45} alt={coin.cryptoName} style={{borderRadius: "100%"}} />
                <div style={{display: "grid", gridTemplateRows: "50% 50%", height: "100%"}}>
                    <div style={{display: "flex", alignItems: "center"}}><span style={{fontStyle: 'italic'}}>{coin.cryptoName}</span></div>
                    {isHovered && <div>
                        <span className="limited-text" style={{fontSize: 10, maxWidth: 65, color: "gray"}}>Price: {price !== -1 ? price : "..."}</span>
                    </div>}
                </div>

                {isHovered && <img src="https://cdn-icons-png.flaticon.com/128/126/126425.png" alt="" width={25} height={25}
                    style={{
                        position: "absolute",
                        bottom: 10,
                        right: 10
                    }}
                />}
            </a>
        </>
    )
}